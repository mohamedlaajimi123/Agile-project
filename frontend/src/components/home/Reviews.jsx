import React from 'react';

const reviews = [
  {
    name: 'Amina Yusuf',
    role: 'Student',
    initials: 'AY',
    quote: 'HorizonExam makes exam access simple and transparent. I can track my schedules with confidence and never miss important updates.',
  },
  {
    name: 'Dr. Martin Kline',
    role: 'Professor',
    initials: 'MK',
    quote: 'The grading workflow is intuitive and reduces administrative burden. I can approve grades, review exceptions, and keep students informed.',
  },
  {
    name: 'Jules Novak',
    role: 'Admin',
    initials: 'JN',
    quote: 'Room allocation and conflict resolution are now manageable in one dashboard. The system has modernized our entire exam cycle.',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 transition-colors duration-500 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
            Trusted by campus teams
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            What HorizonExam users say
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-indigo-200 bg-white/50 p-6 backdrop-blur-xl shadow-lg transition-all hover:-translate-y-1 hover:border-indigo-400/50 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
                  {review.initials}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">{review.name}</p>
                  <span className="mt-1 inline-flex rounded bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400">
                    {review.role}
                  </span>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-zinc-600 dark:text-gray-400">"{review.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
