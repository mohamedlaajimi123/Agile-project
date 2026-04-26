import React from 'react';
import DashboardPreview from './DashboardPreview';

export default function Hero() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#E8EDF2] dark:bg-[#1F2933] py-24 transition-colors duration-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#547A95] dark:text-slate-400">
              University exam intelligence
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              Dive into a futuristic exam management system
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              HorizonExam unifies scheduling, grading, room planning, and student exam access in one secure academic dashboard.
              Manage every exam cycle with clarity, compliance, and confidence.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-[#C2A56D] px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#b49258]"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                View Demo
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
