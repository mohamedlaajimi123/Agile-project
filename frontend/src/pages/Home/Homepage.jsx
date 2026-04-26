import React, { useEffect, useState } from 'react';
import Navbar from '../../components/home/Navbar';
import Hero from '../../components/home/Hero';
import Stats from '../../components/home/Stats';
import Features from '../../components/home/Features';
import Reviews from '../../components/home/Reviews';
import Contact from '../../components/home/Contact';
import Footer from '../../components/home/Footer';

export default function Homepage() {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = window.localStorage.getItem('horizon-theme');
    return storedTheme === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('horizon-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl dark:bg-violet-500/10" />
      </div>

      <div id="top" className="relative z-10">
        <Navbar isDark={isDark} toggleDark={() => setIsDark((prev) => !prev)} />
        <main>
          <Hero />
          <Stats />
          <Features />

          <section className="py-16 transition-colors duration-500 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
                  Dashboard spotlight
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Deep dive into the admin experience
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-gray-400">
                  The HorizonExam dashboard surfaces the most important exam operations with the same card, metric, and status patterns used across the portals.
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-white/50 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Unified exam operations</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-gray-400">Live metrics</p>
                  </div>
                  <div className="rounded-lg border border-indigo-200 bg-white/50 px-4 py-2 text-sm font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                    Real-time insights
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'Exam windows', value: '18', color: 'text-indigo-400' },
                    { label: 'Active rooms', value: '34', color: 'text-violet-400' },
                    { label: 'Review queue', value: '7', color: 'text-pink-400' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-indigo-100 bg-white/50 p-5 dark:border-white/10 dark:bg-white/5">
                      <p className="text-sm font-medium text-zinc-500 dark:text-gray-400">{item.label}</p>
                      <p className={`mt-3 text-3xl font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'Upcoming exam', value: 'Physics II', meta: 'Room A204 - 10:00 AM' },
                    { label: 'Status', value: 'On schedule', meta: 'All rooms confirmed' },
                    { label: 'Next update', value: '2 min', meta: 'Automated refresh' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-indigo-100 bg-white/50 p-5 transition-all hover:border-indigo-400/50 dark:border-white/10 dark:bg-white/5">
                      <p className="text-sm text-zinc-500 dark:text-gray-400">{item.label}</p>
                      <p className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">{item.value}</p>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-gray-400">{item.meta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Reviews />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
