import React from 'react';

const features = [
  {
    title: 'Smart Scheduling',
    description: 'Automated planning helps you assign exam dates that align with curriculum and capacity needs.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#547A95]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16M8 3v4M16 3v4M5 21h14a2 2 0 0 0 2-2V8H3v11a2 2 0 0 0 2 2Z" />
        <path d="M8 13h4M8 17h4M15 13h1" />
      </svg>
    ),
  },
  {
    title: 'Grade Validation Workflow',
    description: 'Keep grading compliant and consistent with approval workflows built for academic staff.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#547A95]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Room Allocation',
    description: 'Allocate rooms efficiently with capacity checks, availability, and references for special accommodation needs.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#547A95]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h4M7 16h6" />
      </svg>
    ),
  },
  {
    title: 'Secure Data System',
    description: 'Encrypted user sessions and audit-ready records keep your institution safe and compliant.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#547A95]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <path d="M5 11h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8Z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#F8FAFC] dark:bg-slate-950 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#547A95] dark:text-slate-400">
            Core capabilities
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Built for modern university operations
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8EDF2] text-[#547A95] dark:bg-slate-800">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
