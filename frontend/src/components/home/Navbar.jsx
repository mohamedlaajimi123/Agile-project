import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

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
    <header className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-all duration-300 ${
      isScrolled
        ? 'border-indigo-200 bg-white/80 shadow-lg dark:border-white/10 dark:bg-slate-950/80'
        : 'border-transparent bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="inline-flex flex-shrink-0 items-center">
          <img
            src="/logo.png"
            alt="HorizonExam Logo"
            className="block h-10 w-auto object-contain dark:hidden"
          />
          <img
            src="/logo-dark.png"
            alt="HorizonExam Logo"
            className="hidden h-10 w-auto object-contain dark:block"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white"
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
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-indigo-200 bg-white/50 text-zinc-600 backdrop-blur-xl transition-all hover:bg-white/70 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white md:inline-flex"
          >
            {isDark ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          <a
            href="/login"
            className="hidden items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-600 hover:to-violet-600 md:inline-flex"
          >
            Login
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-200 bg-white/50 text-zinc-600 backdrop-blur-xl transition-all hover:bg-white/70 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
        isMenuOpen ? 'max-h-80 border-t border-indigo-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90' : 'max-h-0'
      }`}>
        <div className="space-y-4 px-4 pb-5 pt-4 sm:px-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-white/70 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 border-t border-indigo-100 pt-4 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                toggleDark();
                setIsMenuOpen(false);
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white/50 text-sm font-medium text-zinc-600 transition-all hover:bg-white/70 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {isDark ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
              {isDark ? 'Light' : 'Dark'}
            </button>
            <a
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-600 hover:to-violet-600"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
