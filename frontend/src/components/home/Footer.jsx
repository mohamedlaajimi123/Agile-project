import React from 'react';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#2C3947] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-xl font-semibold text-white">HorizonExam</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              A modern exam management system designed for academic institutions that require secure, compliant, and intelligent campus operations.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Quick links</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="transition hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Contact</h3>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                support@horizonexam.edu<br />
                +1 (555) 432-1098
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-slate-600 pt-6 text-sm text-slate-400">
          © {new Date().getFullYear()} HorizonExam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
