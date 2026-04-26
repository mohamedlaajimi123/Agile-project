import React from 'react';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-indigo-200 bg-white/50 text-zinc-600 backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-4 inline-flex">
              <img
                src="/logo.png"
                alt="HorizonExam Logo"
                className="block h-8 w-auto object-contain dark:hidden"
              />
              <img
                src="/logo-dark.png"
                alt="HorizonExam Logo"
                className="hidden h-8 w-auto object-contain dark:block"
              />
            </div>
            <p className="max-w-md text-sm leading-7">
              A modern exam management system designed for academic institutions that require secure, compliant, and intelligent campus operations.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 dark:text-gray-500">Quick links</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="transition hover:text-zinc-900 dark:hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 dark:text-gray-500">Contact</h3>
              <p className="mt-5 text-sm leading-7">
                support@horizonexam.edu<br />
                +1 (555) 432-1098
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-indigo-100 pt-6 text-sm dark:border-white/10">
          © {new Date().getFullYear()} HorizonExam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
