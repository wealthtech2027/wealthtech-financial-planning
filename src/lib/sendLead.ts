const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface Lead {
  name: string;
  phone: string;
  email: string;
  /** Shown in the notification email - say which form / what the visitor asked about */
  source: string;
  /** Optional free text (e.g. questionnaire answers), shown as a separate block in the email */
  notes?: string;
}

/**
 * Sends a lead to the `send-lead` edge function, which emails it to the office.
 * Throws if the lead was not accepted, so forms can show an error instead of a false success.
 */
export async function sendLead(lead: Lead): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Lead service is not configured');
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(lead)
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.success) {
    throw new Error(result.error || `Lead request failed (${response.status})`);
  }
}
