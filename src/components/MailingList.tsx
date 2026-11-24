'use client';

import { useState } from 'react';
import { EASE } from '@/lib/motion';
import { motion } from 'framer-motion';

/**
 * Footer mailing-list form. Mirrors the three fields on the live site
 * (first name, last name, email) and posts to the local API route, which is a
 * validating stub until a CRM key is supplied — see README.
 */
export default function MailingList() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Something went wrong.');
      setState('done');
      setMessage(json.message);
      form.reset();
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  const field =
    'w-full border-b border-white/20 bg-transparent py-3 font-sans text-sm text-white placeholder:text-white/55 transition-colors duration-300 focus:border-gold-400 focus:outline-none';

  if (state === 'done') {
    return (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="max-w-sm border-l border-gold-400 pl-5 font-sans text-sm leading-relaxed text-white/75"
      >
        {message}
      </motion.p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <div className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">First name</span>
          <input name="firstName" required placeholder="First name *" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Last name</span>
          <input name="lastName" required placeholder="Last name *" className={field} />
        </label>
      </div>
      <label className="mt-1 block">
        <span className="sr-only">Email address</span>
        <input
          name="email"
          type="email"
          required
          placeholder="Email address *"
          className={field}
        />
      </label>
      <button
        type="submit"
        disabled={state === 'sending'}
        className="group mt-7 inline-flex items-center gap-3 font-sans text-label font-medium uppercase tracking-[0.18em] text-gold-400 transition-colors hover:text-white disabled:opacity-50"
      >
        {state === 'sending' ? 'Subscribing' : 'Subscribe'}
        <span aria-hidden className="block h-px w-8 bg-current transition-all duration-500 ease-offset group-hover:w-12" />
      </button>
      {state === 'error' && (
        <p role="alert" className="mt-4 font-sans text-sm text-gold-200">
          {message}
        </p>
      )}
    </form>
  );
}
