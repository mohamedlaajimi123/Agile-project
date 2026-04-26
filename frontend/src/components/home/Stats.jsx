import React, { useEffect, useState } from 'react';

const stats = [
  { label: 'Students', value: 1000, suffix: '+' },
  { label: 'Exams Managed', value: 120, suffix: '+' },
  { label: 'Professors', value: 50, suffix: '+' },
  { label: 'Scheduling Conflicts', value: 0, suffix: '%' },
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
      setCounts((current) =>
        current.map((value, index) => {
          const target = stats[index].value;
          const divisor = totalFrames - frame + 1;
          const nextValue = Math.min(target, Math.round(target - target / divisor));
          return nextValue;
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
    <section className="bg-white dark:bg-slate-900 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
            >
              <dt className="text-3xl font-semibold text-slate-900 dark:text-white">
                {counts[index]}
                <span className="text-lg">{stat.suffix}</span>
              </dt>
              <dd className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {stat.label}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
