import React, { useEffect, useState } from 'react';
import { Award, BookOpen, Clock, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Students', value: 1000, suffix: '+', icon: BookOpen, color: 'text-indigo-400' },
  { label: 'Exams Managed', value: 120, suffix: '+', icon: Clock, color: 'text-violet-400' },
  { label: 'Professors', value: 50, suffix: '+', icon: Award, color: 'text-pink-400' },
  { label: 'Scheduling Conflicts', value: 0, suffix: '%', icon: ShieldCheck, color: 'text-emerald-400' },
];

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 900;
    const frameRate = 40;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const interval = window.setInterval(() => {
      frame += 1;
      setCounts(() =>
        stats.map((item) => {
          const divisor = totalFrames - frame + 1;
          return Math.min(item.value, Math.round(item.value - item.value / divisor));
        })
      );

      if (frame >= totalFrames) {
        window.clearInterval(interval);
        setCounts(stats.map((item) => item.value));
      }
    }, frameRate);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="py-16 transition-colors duration-500 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-indigo-200 bg-white/50 p-6 backdrop-blur-xl shadow-lg transition-all hover:-translate-y-1 hover:border-indigo-400/50 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-gray-400">{stat.label}</p>
                  <Icon className={`h-8 w-8 opacity-40 ${stat.color}`} />
                </div>
                <p className={`mt-4 text-4xl font-bold ${stat.color}`}>
                  {counts[index]}
                  <span className="text-lg">{stat.suffix}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
