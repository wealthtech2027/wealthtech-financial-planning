import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface LeadData {
  name: string;
  phone: string;
  email: string;
  source?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(resendApiKey);
    const leadData: LeadData = await req.json();

    const { name, phone, email, source = 'פופאפ מסלקה פנסיונית' } = leadData;

    // Validate required fields
    if (!name || !phone || !email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'WealthTech Leads <onboarding@resend.dev>',
      to: ['udihevroni@gmail.com'],
      replyTo: email,
      subject: `🎯 ליד חדש: ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #2d4a6f); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px;">ליד חדש התקבל! 🎉</h1>
            <p style="color: white; margin: 10px 0 0 0;">מקור: ${source}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e9ecef; border-top: none;">
            <h2 style="color: #1e3a5f; margin-top: 0;">פרטי הליד:</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">שם:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dee2e6; color: #212529;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">טלפון:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
                  <a href="tel:${phone}" style="color: #d4af37; text-decoration: none; font-weight: bold;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; color: #495057;">אימייל:</td>
                <td style="padding: 12px;">
                  <a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding: 20px; background: #d4af37; border-radius: 12px; text-align: center;">
              <a href="tel:${phone}" style="color: #1e3a5f; text-decoration: none; font-weight: bold; font-size: 18px;">
                📞 התקשר עכשיו
              </a>
            </div>
          </div>
          
          <p style="text-align: center; color: #6c757d; font-size: 12px; margin-top: 20px;">
            נשלח אוטומטית מאתר WealthTech
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Email sent successfully:', data);

    return new Response(
      JSON.stringify({ success: true, message: 'Lead sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
