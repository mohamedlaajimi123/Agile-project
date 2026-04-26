import React, { useState } from 'react';

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
    <section id="contact" className="bg-white dark:bg-slate-950 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#547A95] dark:text-slate-400">
          Get in touch
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
          Request a demo or ask a question
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Our team is ready to help your institution deploy an exam management system that is secure, modern, and easy to adopt.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col text-left text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#547A95] focus:ring-[#547A95]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="flex flex-col text-left text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="mt-3 min-h-[160px] rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#547A95] focus:ring-[#547A95]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#C2A56D] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#b49258]"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Thank you! Your message has been sent and our team will reach out shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
