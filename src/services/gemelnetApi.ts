// Gemel Net API Service
// Fetches pension fund data via Edge Function (to bypass CORS)

import { supabase } from '@/integrations/supabase/client';

export interface ProcessedFund {
  id: string;
  fundNumber: number | null;
  name: string;
  company: string;
  type: 'gemel' | 'hishtalmut' | 'pension' | 'pitzuim';
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
}

interface EdgeFunctionResponse {
  success: boolean;
  data?: ProcessedFund[];
  totalRaw?: number;
  totalProcessed?: number;
  error?: string;
}

// Edge Function URL
const EDGE_FUNCTION_URL = 'https://pxxpyxrdtjuhrcsdympl.supabase.co/functions/v1/fetch-gemelnet';

// Main function to fetch all pension fund data via Edge Function
export async function fetchAllPensionData(): Promise<ProcessedFund[]> {
  try {
    console.log('Fetching pension data via Edge Function...');
    
    // Try direct fetch to Edge Function
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Edge Function HTTP error:', response.status, response.statusText);
      return [];
    }
    
    const data: EdgeFunctionResponse = await response.json();
    
    if (!data?.success || !data.data) {
      console.error('Edge Function returned error:', data?.error);
      return [];
    }
    
    console.log(`Fetched ${data.totalProcessed} unique funds from ${data.totalRaw} raw records`);
    
    // Log counts by type
    const typeCounts = data.data.reduce((acc, fund) => {
      acc[fund.type] = (acc[fund.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('Funds by type:', typeCounts);
    
    return data.data;
    
  } catch (error) {
    console.error('Error fetching pension data:', error);
    return [];
  }
}
