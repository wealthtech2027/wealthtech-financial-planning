// Edge Function to fetch Gemel Net data from data.gov.il
// This bypasses CORS restrictions by fetching server-side

const DATA_GOV_API = 'https://data.gov.il/api/3/action/datastore_search';
const RESOURCE_ID = 'a30dcbea-a1d2-482c-ae29-8f781f5025fb';

interface CKANResponse {
  success: boolean;
  result: {
    records: Record<string, any>[];
    total: number;
    fields: Array<{ id: string; type: string }>;
  };
}

interface MonthlyRecord {
  period: number; // YYYYMM format
  monthlyYield: number | null;
  ytdYield: number | null;
  avgAnnual3yr: number | null;
  avgAnnual5yr: number | null;
}

interface FundData {
  id: string;
  fundNumber: number | null;
  name: string;
  company: string;
  type: string;
  track: string;
  returns: {
    ytd: number;
    oneYear: number;
    threeYears: number;
    fiveYears: number;
  };
  managementFee: number;
  depositFee: number;
  assetsUnderManagement: number;
  lastUpdate: string;
  _sortDate: number;
  _monthlyRecords: MonthlyRecord[];
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    console.log('Fetching data from data.gov.il...');
    
    const allRecords: Record<string, any>[] = [];
    const limit = 10000;
    let offset = 0;
    let total = Infinity;
    let fieldNames: string[] = [];
    
    // Fetch all pages
    while (offset < total) {
      const url = `${DATA_GOV_API}?resource_id=${RESOURCE_ID}&limit=${limit}&offset=${offset}`;
      console.log(`Fetching offset ${offset}...`);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WealthTech-App/1.0',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data: CKANResponse = await response.json();
      
      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }
      
      total = data.result.total;
      const records = data.result.records;
      
      // Log field names from first batch
      if (offset === 0 && records.length > 0) {
        fieldNames = Object.keys(records[0]);
        console.log('Available fields:', JSON.stringify(fieldNames));
        console.log('Sample record:', JSON.stringify(records[0]));
      }
      
      console.log(`Fetched ${records.length} records, total: ${total}`);
      
      if (records.length === 0) break;
      
      allRecords.push(...records);
      offset += limit;
      
      // Safety limit
      if (offset > 500000) break;
    }
    
    console.log(`Total fetched: ${allRecords.length} records`);
    
    // Process and deduplicate
    const processedFunds = processRecords(allRecords);
    
    return new Response(JSON.stringify({
      success: true,
      data: processedFunds,
      totalRaw: allRecords.length,
      totalProcessed: processedFunds.length,
      fieldNames: fieldNames,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    });
    
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});

/**
 * Calculate compound return from an array of monthly returns
 * Formula: ((1 + r1/100) * (1 + r2/100) * ... * (1 + rN/100) - 1) * 100
 */
function calculateCompoundReturn(monthlyReturns: number[]): number {
  if (monthlyReturns.length === 0) return 0;
  
  let compound = 1;
  for (const r of monthlyReturns) {
    compound *= (1 + r / 100);
  }
  
  return (compound - 1) * 100;
}

/**
 * Get trailing 12-month return from monthly records
 */
function getTrailing12MonthReturn(records: MonthlyRecord[], latestPeriod: number): number {
  // Sort by period descending
  const sorted = [...records].sort((a, b) => b.period - a.period);
  
  // Get the year and month from latest period
  const latestYear = Math.floor(latestPeriod / 100);
  const latestMonth = latestPeriod % 100;
  
  // Calculate the start period (12 months back)
  let startYear = latestYear;
  let startMonth = latestMonth - 11; // We want 12 months including current
  if (startMonth <= 0) {
    startMonth += 12;
    startYear -= 1;
  }
  const startPeriod = startYear * 100 + startMonth;
  
  // Filter records within the 12-month range and extract monthly yields
  const monthlyReturns: number[] = [];
  const seenPeriods = new Set<number>();
  
  for (const record of sorted) {
    if (record.period >= startPeriod && record.period <= latestPeriod) {
      if (record.monthlyYield !== null && !seenPeriods.has(record.period)) {
        monthlyReturns.push(record.monthlyYield);
        seenPeriods.add(record.period);
      }
    }
  }
  
  // If we have at least 6 months of data, calculate compound return
  if (monthlyReturns.length >= 6) {
    return calculateCompoundReturn(monthlyReturns);
  }
  
  return 0;
}

function processRecords(records: Record<string, any>[]) {
  const fundMap = new Map<string, FundData>();
  
  // First pass: collect all monthly records for each fund
  for (const item of records) {
    const fundNumber = item['FUND_ID'] || null;
    const name = item['FUND_NAME'] || '';
    
    if (!name || name.trim() === '') continue;
    
    const key = fundNumber ? String(fundNumber) : name;
    const reportPeriod = item['REPORT_PERIOD'] || 0;
    const periodNum = typeof reportPeriod === 'number' ? reportPeriod : 0;
    
    const monthlyRecord: MonthlyRecord = {
      period: periodNum,
      monthlyYield: item['MONTHLY_YIELD'] !== null && item['MONTHLY_YIELD'] !== undefined 
        ? Number(item['MONTHLY_YIELD']) 
        : null,
      ytdYield: item['YEAR_TO_DATE_YIELD'] !== null && item['YEAR_TO_DATE_YIELD'] !== undefined 
        ? Number(item['YEAR_TO_DATE_YIELD']) 
        : null,
      avgAnnual3yr: item['AVG_ANNUAL_YIELD_TRAILING_3YRS'] !== null && item['AVG_ANNUAL_YIELD_TRAILING_3YRS'] !== undefined 
        ? Number(item['AVG_ANNUAL_YIELD_TRAILING_3YRS']) 
        : null,
      avgAnnual5yr: item['AVG_ANNUAL_YIELD_TRAILING_5YRS'] !== null && item['AVG_ANNUAL_YIELD_TRAILING_5YRS'] !== undefined 
        ? Number(item['AVG_ANNUAL_YIELD_TRAILING_5YRS']) 
        : null,
    };
    
    const existing = fundMap.get(key);
    
    if (!existing) {
      // Create new fund entry
      const fundClassification = item['FUND_CLASSIFICATION'] || '';
      const specialization = item['SPECIALIZATION'] || '';
      const type = determineFundType(name, fundClassification, specialization);
      
      fundMap.set(key, {
        id: `${type}-${fundNumber || records.indexOf(item)}`,
        fundNumber: fundNumber ? Number(fundNumber) : null,
        name,
        company: item['MANAGING_CORPORATION'] || 'לא ידוע',
        type,
        track: specialization || fundClassification || 'כללי',
        returns: {
          ytd: 0,
          oneYear: 0,
          threeYears: 0,
          fiveYears: 0,
        },
        managementFee: Number(item['AVG_ANNUAL_MANAGEMENT_FEE'] || 0) || 0,
        depositFee: Number(item['AVG_DEPOSIT_FEE'] || 0) || 0,
        assetsUnderManagement: Number(item['TOTAL_ASSETS'] || 0) || 0,
        lastUpdate: formatReportPeriod(reportPeriod),
        _sortDate: periodNum,
        _monthlyRecords: [monthlyRecord],
      });
    } else {
      // Add monthly record to existing fund
      existing._monthlyRecords.push(monthlyRecord);
      
      // Update to most recent record's metadata if this is newer
      if (periodNum > existing._sortDate) {
        existing._sortDate = periodNum;
        existing.lastUpdate = formatReportPeriod(reportPeriod);
        existing.managementFee = Number(item['AVG_ANNUAL_MANAGEMENT_FEE'] || 0) || existing.managementFee;
        existing.depositFee = Number(item['AVG_DEPOSIT_FEE'] || 0) || existing.depositFee;
        existing.assetsUnderManagement = Number(item['TOTAL_ASSETS'] || 0) || existing.assetsUnderManagement;
      }
    }
  }
  
  // Second pass: calculate returns for each fund
  for (const [key, fund] of fundMap) {
    const records = fund._monthlyRecords;
    const latestPeriod = fund._sortDate;
    
    // Sort records by period to get the latest one
    const sorted = [...records].sort((a, b) => b.period - a.period);
    const latestRecord = sorted[0];
    
    // Calculate trailing 12-month return from monthly data
    const trailing12Month = getTrailing12MonthReturn(records, latestPeriod);
    
    // Use calculated 12-month return, or fallback to YTD if available
    const ytdValue = latestRecord?.ytdYield || 0;
    
    // For 3yr and 5yr, use the API values from the latest record
    const threeYearValue = latestRecord?.avgAnnual3yr || 0;
    const fiveYearValue = latestRecord?.avgAnnual5yr || 0;
    
    fund.returns = {
      ytd: Number(ytdValue.toFixed(2)),
      oneYear: Number(trailing12Month.toFixed(2)) || Number(ytdValue.toFixed(2)),
      threeYears: Number(threeYearValue.toFixed(2)),
      fiveYears: Number(fiveYearValue.toFixed(2)),
    };
    
    // Debug logging for specific funds
    if (fund.fundNumber === 15302 || fund.fundNumber === 15424) {
      console.log(`FUND_${fund.fundNumber}_CALC:`, JSON.stringify({
        name: fund.name,
        latestPeriod,
        monthlyRecordsCount: records.length,
        trailing12Month: trailing12Month.toFixed(2),
        ytdFromAPI: ytdValue,
        finalOneYear: fund.returns.oneYear,
        monthlyYields: sorted.slice(0, 12).map(r => ({ period: r.period, yield: r.monthlyYield }))
      }));
    }
  }
  
  // Remove internal fields and return
  return Array.from(fundMap.values()).map(({ _sortDate, _monthlyRecords, ...fund }) => fund);
}

function determineFundType(name: string, fundClassification: string, specialization: string): string {
  const nameLower = name.toLowerCase();
  
  // First, check fund name for explicit keywords (most reliable)
  if (nameLower.includes('השתלמות')) {
    return 'hishtalmut';
  }
  if (nameLower.includes('פנסיה') || nameLower.includes('פנסי')) {
    return 'pension';
  }
  // Check for explicit "מרכזית לפיצויים" or "קופה לפיצויים" in name
  if (nameLower.includes('לפיצויים') || nameLower.includes('פיצויים למעסיק')) {
    return 'pitzuim';
  }
  
  // Second, check classification
  if (fundClassification.includes('השתלמות')) {
    return 'hishtalmut';
  }
  if (fundClassification.includes('פנסיה') || fundClassification.includes('פנסיה חדשה')) {
    return 'pension';
  }
  // Only classify as pitzuim if classification explicitly says "מרכזית לפיצויים"
  if (fundClassification.includes('מרכזית לפיצויים')) {
    return 'pitzuim';
  }
  
  // Default to gemel for "תגמולים" and general cases
  return 'gemel';
}

function formatReportPeriod(period: number | string): string {
  if (!period) return '';
  const periodStr = String(period);
  if (periodStr.length === 6) {
    // Format YYYYMM as MM/YYYY
    const year = periodStr.substring(0, 4);
    const month = periodStr.substring(4, 6);
    return `${month}/${year}`;
  }
  return periodStr;
}
