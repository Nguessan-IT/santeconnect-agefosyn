import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requis' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SantéConnect <onboarding@resend.dev>',
        to: [email],
        subject: 'Bienvenue sur SantéConnect AGEFOSYN 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #0ea5e9;">SantéConnect AGEFOSYN</h1>
            </div>
            <h2>Bonjour ${name || 'cher utilisateur'} 👋</h2>
            <p>Votre compte a été créé avec succès sur <strong>SantéConnect AGEFOSYN</strong>.</p>
            <p>Vous pouvez maintenant :</p>
            <ul>
              <li>📅 Prendre des rendez-vous en ligne</li>
              <li>💬 Communiquer avec vos médecins</li>
              <li>📋 Consulter vos dossiers médicaux</li>
              <li>🎥 Effectuer des téléconsultations</li>
            </ul>
            <p>Merci de votre confiance !</p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              © ${new Date().getFullYear()} SantéConnect AGEFOSYN — Tous droits réservés.
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
