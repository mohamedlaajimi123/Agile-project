import React from 'react';
import DashboardPreview from './DashboardPreview';

export default function Hero() {
  return (
    <section id="about" className="relative overflow-hidden py-16 transition-colors duration-500 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
              University exam intelligence
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Exam operations in one secure academic portal
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600 dark:text-gray-400 sm:text-lg">
              HorizonExam unifies scheduling, grading, room planning, and student exam access in the same focused interface used by every campus role.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-600 hover:to-violet-600"
              >
                Request Demo
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-indigo-200 bg-white/50 px-6 py-3 text-sm font-semibold text-zinc-700 backdrop-blur-xl transition-all hover:bg-white/70 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                View Capabilities
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
