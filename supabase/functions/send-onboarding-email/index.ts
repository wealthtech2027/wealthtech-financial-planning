import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OnboardingData {
  // Personal Info
  fullName: string;
  phone: string;
  email: string;
  age: string;
  maritalStatus: string;
  children: string;
  occupation: string;
  industry: string;
  
  // Financial Situation
  monthlyIncome: string;
  additionalIncome: string;
  monthlyExpenses: string;
  existingSavings: string;
  realEstate: string;
  loans: string;
  
  // Existing Products
  pensionFunds: string[];
  insurancePolicies: string[];
  investments: string[];
  otherProducts: string;
  
  // Goals
  shortTermGoals: string[];
  longTermGoals: string[];
  retirementAge: string;
  financialFreedom: string;
  
  // Risk Profile
  riskTolerance: string;
  investmentExperience: string;
  marketDropReaction: string;
  
  // Special Needs
  specificServices: string[];
  urgentMatters: string;
  additionalNotes: string;
  preferredContact: string;
  bestTimeToCall: string;
}

const formatArray = (arr: string[]): string => {
  return arr && arr.length > 0 ? arr.join(', ') : 'לא צוין';
};

const formatValue = (val: string): string => {
  return val || 'לא צוין';
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const resend = new Resend(resendApiKey);
    const data: OnboardingData = await req.json();

    const { data: emailData, error } = await resend.emails.send({
      from: 'WealthTech Onboarding <onboarding@resend.dev>',
      to: ['udi.hevroni@wealthtech.co.il'],
      subject: `שאלון היכרות חדש - ${data.fullName}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #1a365d; color: white; padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">שאלון היכרות חדש</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">התקבל מאתר WealthTech</p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 0 0 12px 12px;">
            
            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
              <h2 style="color: #d4a853; margin: 0 0 15px 0; font-size: 18px;">📋 פרטים אישיים</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">שם מלא:</td><td style="padding: 8px 0; color: #1a365d; font-weight: bold;">${formatValue(data.fullName)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">טלפון:</td><td style="padding: 8px 0; color: #1a365d; font-weight: bold;">${formatValue(data.phone)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">אימייל:</td><td style="padding: 8px 0; color: #1a365d; font-weight: bold;">${formatValue(data.email)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">גיל:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.age)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">מצב משפחתי:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.maritalStatus)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">ילדים:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.children)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">מקצוע:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.occupation)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">תעשייה:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.industry)}</td></tr>
              </table>
            </div>
            
            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
              <h2 style="color: #d4a853; margin: 0 0 15px 0; font-size: 18px;">💰 מצב פיננסי</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">הכנסה חודשית:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.monthlyIncome)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">הכנסות נוספות:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.additionalIncome)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">הוצאות חודשיות:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.monthlyExpenses)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">חסכונות:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.existingSavings)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">נדל"ן:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.realEstate)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">הלוואות:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.loans)}</td></tr>
              </table>
            </div>
            
            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
              <h2 style="color: #d4a853; margin: 0 0 15px 0; font-size: 18px;">📁 מוצרים קיימים</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">קרנות פנסיה:</td><td style="padding: 8px 0; color: #1a365d;">${formatArray(data.pensionFunds)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">ביטוחים:</td><td style="padding: 8px 0; color: #1a365d;">${formatArray(data.insurancePolicies)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">השקעות:</td><td style="padding: 8px 0; color: #1a365d;">${formatArray(data.investments)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">מוצרים נוספים:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.otherProducts)}</td></tr>
              </table>
            </div>
            
            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
              <h2 style="color: #d4a853; margin: 0 0 15px 0; font-size: 18px;">🎯 יעדים</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">יעדים לטווח קצר:</td><td style="padding: 8px 0; color: #1a365d;">${formatArray(data.shortTermGoals)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">יעדים לטווח ארוך:</td><td style="padding: 8px 0; color: #1a365d;">${formatArray(data.longTermGoals)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">גיל פרישה:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.retirementAge)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">הכנסה רצויה בפרישה:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.financialFreedom)}</td></tr>
              </table>
            </div>
            
            <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
              <h2 style="color: #d4a853; margin: 0 0 15px 0; font-size: 18px;">📊 פרופיל סיכון</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">רמת סיכון:</td><td style="padding: 8px 0; color: #1a365d; font-weight: bold;">${formatValue(data.riskTolerance)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">ניסיון בהשקעות:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.investmentExperience)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">תגובה לירידות:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.marketDropReaction)}</td></tr>
              </table>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h2 style="color: #d4a853; margin: 0 0 15px 0; font-size: 18px;">📞 העדפות קשר</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">שירותים מבוקשים:</td><td style="padding: 8px 0; color: #1a365d;">${formatArray(data.specificServices)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">נושאים דחופים:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.urgentMatters)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">הערות:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.additionalNotes)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">אמצעי קשר מועדף:</td><td style="padding: 8px 0; color: #1a365d; font-weight: bold;">${formatValue(data.preferredContact)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">זמן מועדף:</td><td style="padding: 8px 0; color: #1a365d;">${formatValue(data.bestTimeToCall)}</td></tr>
              </table>
            </div>
            
          </div>
          
          <p style="text-align: center; color: #64748b; font-size: 12px; margin-top: 20px;">
            שאלון זה נשלח מאתר WealthTech
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: emailData?.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
