import React, { useEffect, useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleDark }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-30 transition-colors duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-slate-900/95 shadow-sm backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          HorizonExam
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500 md:inline-flex"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <a
            href="/login"
            className="hidden items-center justify-center rounded-2xl bg-[#C2A56D] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#b49258] md:inline-flex"
          >
            Login
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
        isMenuOpen ? 'max-h-80 border-t border-slate-200 bg-white/95 dark:border-slate-700 dark:bg-slate-950/95' : 'max-h-0'
      }`}>
        <div className="space-y-4 px-4 pb-5 pt-4 sm:px-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {item.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                toggleDark();
                setIsMenuOpen(false);
              }}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500"
            >
              {isDark ? '☀️ Light mode' : '🌙 Dark mode'}
            </button>
            <a
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#C2A56D] px-4 text-sm font-semibold text-slate-950 transition hover:bg-[#b49258]"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
