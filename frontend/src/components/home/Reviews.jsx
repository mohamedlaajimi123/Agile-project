import React from 'react';

const reviews = [
  {
    name: 'Amina Yusuf',
    role: 'Student',
    quote: 'HorizonExam makes exam access simple and transparent. I can track my schedules with confidence and never miss important updates.',
  },
  {
    name: 'Dr. Martin Kline',
    role: 'Professor',
    quote: 'The grading workflow is intuitive and reduces administrative burden. I can approve grades, review exceptions, and keep students informed.',
  },
  {
    name: 'Jules Novak',
    role: 'Admin',
    quote: 'Room allocation and conflict resolution are now manageable in one dashboard. The system has modernized our entire exam cycle.',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-[#E8EDF2] dark:bg-[#1F2933] py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#547A95] dark:text-slate-400">
            Trusted by campus teams
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            What HorizonExam users say
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">{review.name}</p>
                  <span className="mt-1 inline-flex rounded-full bg-[#547A95]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#547A95] dark:bg-[#547A95]/15 dark:text-[#B7D2E2]">
                    {review.role}
                  </span>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">“{review.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
