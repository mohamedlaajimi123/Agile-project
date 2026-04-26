import React, { useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-16 transition-colors duration-500 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
            Get in touch
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Request a demo or ask a question
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-gray-400">
            Our team is ready to help your institution deploy the same secure exam management workflow across every campus role.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-indigo-200 bg-white/50 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
          <label className="block text-left text-sm font-semibold text-zinc-700 dark:text-gray-300">
            Email
            <div className="relative mt-3">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-indigo-200 bg-white/50 px-4 py-2.5 pl-10 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-400/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
                placeholder="you@institution.edu"
              />
            </div>
          </label>

          <label className="block text-left text-sm font-semibold text-zinc-700 dark:text-gray-300">
            Message
            <div className="relative mt-3">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-gray-500" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="min-h-[160px] w-full rounded-lg border border-indigo-200 bg-white/50 px-4 py-2.5 pl-10 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-400/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
                placeholder="Tell us what your exam team needs."
              />
            </div>
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-600 hover:to-violet-600"
          >
            Send Message
          </button>

          {submitted && (
            <p className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
              Thank you. Your message has been sent and our team will reach out shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
