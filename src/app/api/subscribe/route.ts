import { NextResponse } from 'next/server';

/** Mailing-list endpoint. Same contract as /api/contact — see that file. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email);

  if (firstName.length < 2 || lastName.length < 2 || !EMAIL.test(email)) {
    return NextResponse.json(
      { error: 'Please enter your first name, last name and a valid email address.' },
      { status: 422 },
    );
  }

  if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_NEWSLETTER_FORM_GUID) {
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_NEWSLETTER_FORM_GUID}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: firstName },
          { name: 'lastname', value: lastName },
          { name: 'email', value: email },
        ],
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Subscription failed. Please try again later.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, message: `Thank you, ${firstName}. You are on the list.` });
  }

  console.info('[subscribe] validated submission (no CRM configured)', { firstName, lastName, email });

  return NextResponse.json({
    ok: true,
    demo: true,
    message: `Thank you, ${firstName}. Your details passed validation and were received by this preview environment. The mailing-list integration is not connected in the demo build.`,
  });
}
