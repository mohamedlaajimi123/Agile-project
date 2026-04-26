import React, { useEffect, useState } from 'react';
import Navbar from '../../components/home/Navbar';
import Hero from '../../components/home/Hero';
import Stats from '../../components/home/Stats';
import Features from '../../components/home/Features';
import Reviews from '../../components/home/Reviews';
import Contact from '../../components/home/Contact';
import Footer from '../../components/home/Footer';

export default function Homepage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('horizon-theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    }
  }, []);

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
    <div className={`min-h-screen bg-[#E8EDF2] text-slate-900 transition-colors duration-300 dark:bg-[#1F2933] dark:text-slate-100`}>
      <div id="top">
        <Navbar isDark={isDark} toggleDark={() => setIsDark((prev) => !prev)} />
        <main>
          <Hero />
          <Stats />
          <Features />
          <section className="bg-[#F8FAFC] dark:bg-slate-950 py-24 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#547A95] dark:text-slate-400">
                  Dashboard spotlight
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
                  Deep dive into the admin experience
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  The HorizonExam dashboard is built to surface the most important exam operations with clarity and speed.
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Live system preview</h3>
                <div className="overflow-hidden rounded-[1.75rem]">
                  <section className="rounded-[1.75rem] bg-[#E8EDF2] p-6 dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto">
                      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#547A95] dark:text-slate-400">Live metrics</p>
                            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Unified exam operations</p>
                          </div>
                          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            Real-time insights
                          </div>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Exam windows</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">18</p>
                          </div>
                          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active rooms</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">34</p>
                          </div>
                          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Review queue</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">7</p>
                          </div>
                        </div>

                        <div className="mt-10 overflow-hidden rounded-[1.5rem] bg-slate-100 p-4 dark:bg-slate-900">
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-3xl bg-white p-4 dark:bg-slate-950">
                              <p className="text-sm text-slate-500 dark:text-slate-400">Upcoming exam</p>
                              <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Physics II</p>
                              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Room A204 • 10:00 AM</p>
                            </div>
                            <div className="rounded-3xl bg-white p-4 dark:bg-slate-950">
                              <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                              <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">On schedule</p>
                              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">All rooms confirmed</p>
                            </div>
                            <div className="rounded-3xl bg-white p-4 dark:bg-slate-950">
                              <p className="text-sm text-slate-500 dark:text-slate-400">Next update</p>
                              <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">2 min</p>
                              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Automated refresh</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
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
