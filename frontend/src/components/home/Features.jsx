import React from 'react';
import { CalendarDays, CheckCircle2, DoorOpen, Shield } from 'lucide-react';

const features = [
  {
    title: 'Smart Scheduling',
    description: 'Plan exam dates around curriculum, capacity, and campus availability from a single operational view.',
    icon: CalendarDays,
    color: 'text-indigo-400',
  },
  {
    title: 'Grade Validation Workflow',
    description: 'Keep grading compliant and consistent with review states built for academic staff.',
    icon: CheckCircle2,
    color: 'text-violet-400',
  },
  {
    title: 'Room Allocation',
    description: 'Assign rooms with capacity checks, availability, and accommodation requirements in context.',
    icon: DoorOpen,
    color: 'text-pink-400',
  },
  {
    title: 'Secure Data System',
    description: 'Encrypted sessions and audit-ready records keep institutional workflows protected.',
    icon: Shield,
    color: 'text-emerald-400',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 transition-colors duration-500 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
            Core capabilities
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Built for modern university operations
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-gray-400">
            The homepage now follows the same card, icon, and spacing language as the portal dashboards.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-indigo-200 bg-white/50 p-6 backdrop-blur-xl shadow-lg transition-all hover:-translate-y-1 hover:border-indigo-400/50 dark:border-white/10 dark:bg-white/5"
              >
                <div className={`mb-5 inline-flex rounded-xl bg-slate-100 p-3 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
