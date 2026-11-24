import { NextResponse } from 'next/server';

/**
 * Contact form endpoint.
 *
 * Server-side validation is real and runs on every submission. Delivery is
 * deliberately not wired to a third-party service: the live site stores form
 * submissions in HubSpot (per its published privacy policy), and connecting
 * this route needs a HubSpot portal ID, form GUID and private-app token that
 * only Offset Capital can issue. See README → "Form delivery" for the exact
 * configuration required.
 *
 * Until those are set, a valid submission is logged server-side and the
 * visitor receives an honest acknowledgement that the message was received by
 * the demo environment.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email);
  const company = str(body.company);
  const message = str(body.message);
  const consent = body.consent === true || body.consent === 'on';
  const newsletter = body.newsletter === true || body.newsletter === 'on';

  const errors: Record<string, string> = {};
  if (firstName.length < 2) errors.firstName = 'Please enter your first name.';
  if (lastName.length < 2) errors.lastName = 'Please enter your last name.';
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email address.';
  if (company.length < 2) errors.company = 'Please enter your company name.';
  if (message.length < 10) errors.message = 'Please tell us a little about your transaction.';
  if (!consent) errors.consent = 'Please accept the privacy policy to continue.';

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Please check the highlighted fields.', errors }, { status: 422 });
  }

  const hubspotConfigured =
    Boolean(process.env.HUBSPOT_PORTAL_ID) && Boolean(process.env.HUBSPOT_FORM_GUID);

  if (hubspotConfigured) {
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: firstName },
          { name: 'lastname', value: lastName },
          { name: 'email', value: email },
          { name: 'company', value: company },
          { name: 'message', value: message },
        ],
        context: { pageName: 'Contact — Offset Capital' },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: 'I accept the privacy policy',
            communications: [
              {
                value: newsletter,
                subscriptionTypeId: Number(process.env.HUBSPOT_SUBSCRIPTION_ID ?? 0),
                text: 'Subscribe to our newsletter',
              },
            ],
          },
        },
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'We could not send your message. Please email info@offsetcap.com directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: `Thank you, ${firstName}. Your message has reached the Offset Capital team — we will be in touch shortly.`,
    });
  }

  console.info('[contact] validated submission (no CRM configured)', {
    firstName,
    lastName,
    email,
    company,
    newsletter,
    length: message.length,
  });

  return NextResponse.json({
    ok: true,
    demo: true,
    message: `Thank you, ${firstName}. Your details passed validation and were received by this preview environment. Email delivery is not connected in the demo build — in production this submission routes to Offset Capital's CRM. To reach the team today, please email info@offsetcap.com.`,
  });
}
