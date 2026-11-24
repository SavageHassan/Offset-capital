'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { EASE } from '@/lib/motion';

type Errors = Record<string, string>;

const FIELDS = [
  { name: 'firstName', label: 'First name', type: 'text', required: true, half: true },
  { name: 'lastName', label: 'Last name', type: 'text', required: true, half: true },
  { name: 'email', label: 'Email address', type: 'email', required: true, half: true },
  { name: 'company', label: 'Company name', type: 'text', required: true, half: true },
] as const;

/**
 * Contact form. Validation runs in the browser for immediate feedback and
 * again on the server, which is the authority — field-level errors returned by
 * /api/contact are mapped straight back onto the inputs.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [notice, setNotice] = useState('');

  /** Clear a field's error as soon as the visitor starts correcting it. */
  function clearError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      email: String(fd.get('email') ?? ''),
      company: String(fd.get('company') ?? ''),
      message: String(fd.get('message') ?? ''),
      consent: fd.get('consent') === 'on',
      newsletter: fd.get('newsletter') === 'on',
    };

    // Client-side pass, so the visitor is not waiting on a round trip.
    const local: Errors = {};
    if (payload.firstName.trim().length < 2) local.firstName = 'Please enter your first name.';
    if (payload.lastName.trim().length < 2) local.lastName = 'Please enter your last name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) local.email = 'Please enter a valid email address.';
    if (payload.company.trim().length < 2) local.company = 'Please enter your company name.';
    if (payload.message.trim().length < 10) local.message = 'Please tell us a little about your transaction.';
    if (!payload.consent) local.consent = 'Please accept the privacy policy to continue.';

    if (Object.keys(local).length) {
      setErrors(local);
      setState('error');
      setNotice('Please check the highlighted fields.');
      return;
    }

    setErrors({});
    setState('sending');
    setNotice('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setState('error');
        setNotice(json.error ?? 'Something went wrong.');
        return;
      }
      setState('done');
      setNotice(json.message);
      form.reset();
    } catch {
      setState('error');
      setNotice('We could not reach the server. Please email info@offsetcap.com directly.');
    }
  }

  const inputCls = (name: string) =>
    `peer w-full border-b bg-transparent pb-3 pt-7 font-sans text-[0.9375rem] text-navy-900 placeholder-transparent transition-colors duration-300 focus:outline-none ${
      errors[name] ? 'border-gold-600' : 'border-navy-900/20 focus:border-navy-700'
    }`;

  const labelCls =
    'pointer-events-none absolute left-0 top-7 origin-left font-sans text-[0.9375rem] text-stone-500 transition-all duration-300 ease-offset peer-focus:top-0 peer-focus:text-[0.625rem] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-navy-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.625rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-stone-500';

  return (
    <AnimatePresence mode="wait">
      {state === 'done' ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="border-l-2 border-gold-400 pl-8"
        >
          <p className="eyebrow text-navy-700">Message received</p>
          <p className="mt-6 max-w-measure font-display text-[1.5rem] font-light leading-snug text-navy-900">
            {notice}
          </p>
          <button
            type="button"
            onClick={() => setState('idle')}
            className="mt-8 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-navy-700 underline decoration-gold-400 underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.name} className="relative">
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.label}
                  autoComplete={
                    f.name === 'firstName'
                      ? 'given-name'
                      : f.name === 'lastName'
                        ? 'family-name'
                        : f.name === 'email'
                          ? 'email'
                          : 'organization'
                  }
                  aria-invalid={Boolean(errors[f.name])}
                  aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                  onInput={() => clearError(f.name)}
                  className={inputCls(f.name)}
                />
                <label htmlFor={f.name} className={labelCls}>
                  {f.label} <span className="text-gold-700">*</span>
                </label>
                {errors[f.name] && (
                  <p id={`${f.name}-error`} role="alert" className="mt-2 font-sans text-[0.75rem] text-gold-700">
                    {errors[f.name]}
                  </p>
                )}
              </div>
            ))}

            <div className="relative sm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Message"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                onInput={() => clearError('message')}
                className={`${inputCls('message')} resize-none`}
              />
              <label htmlFor="message" className={labelCls}>
                Tell us about your transaction <span className="text-gold-700">*</span>
              </label>
              {errors.message && (
                <p id="message-error" role="alert" className="mt-2 font-sans text-[0.75rem] text-gold-700">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-12 space-y-5">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                name="consent"
                onChange={() => clearError('consent')}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-300 peer-checked:border-navy-700 peer-checked:bg-navy-700 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 ${
                  errors.consent ? 'border-gold-600' : 'border-navy-900/25'
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white transition-opacity duration-200">
                  <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </span>
              <span className="font-sans text-[0.875rem] leading-relaxed text-stone-600">
                I accept the{' '}
                <Link href="/privacy" className="underline decoration-gold-400 underline-offset-4 hover:text-navy-700">
                  privacy policy
                </Link>
                . <span className="text-gold-700">*</span>
              </span>
            </label>
            {errors.consent && (
              <p role="alert" className="font-sans text-[0.75rem] text-gold-700">
                {errors.consent}
              </p>
            )}

            <label className="flex cursor-pointer items-start gap-4">
              <input type="checkbox" name="newsletter" className="peer sr-only" />
              <span
                aria-hidden
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-navy-900/25 transition-colors duration-300 peer-checked:border-navy-700 peer-checked:bg-navy-700 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white transition-opacity duration-200">
                  <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
              </span>
              <span className="font-sans text-[0.875rem] leading-relaxed text-stone-600">
                Subscribe to our newsletter.
              </span>
            </label>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <button
              type="submit"
              disabled={state === 'sending'}
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-navy-700 px-9 py-4 font-sans text-label-lg font-medium uppercase tracking-[0.16em] text-white transition-colors duration-500 ease-offset hover:text-navy-900 disabled:opacity-60"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-[650ms] ease-offset group-hover:translate-x-0"
              />
              <span className="relative z-10">{state === 'sending' ? 'Sending' : 'Send'}</span>
              <svg aria-hidden viewBox="0 0 24 24" className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 ease-offset group-hover:translate-x-1">
                <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </button>

            {state === 'error' && notice && (
              <p role="alert" className="max-w-xs font-sans text-[0.8125rem] leading-relaxed text-gold-700">
                {notice}
              </p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
