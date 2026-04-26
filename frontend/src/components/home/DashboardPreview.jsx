import React, { useState } from 'react';

const tabs = ['Dashboard', 'Exams', 'Grades'];

const dashboardCards = [
  { label: 'Active Exams', value: '14', accent: 'bg-[#C2A56D]/15 text-[#C2A56D]' },
  { label: 'Pending Rooms', value: '8', accent: 'bg-[#547A95]/15 text-[#547A95]' },
  { label: 'Confirmed Students', value: '1,042', accent: 'bg-[#2C3947]/15 text-[#2C3947]' },
];

const examSchedule = [
  { subject: 'Algorithms', room: 'B204', time: '09:00 AM' },
  { subject: 'Linear Algebra', room: 'A118', time: '11:30 AM' },
  { subject: 'Database Systems', room: 'C301', time: '02:00 PM' },
];

const gradeList = [
  { name: 'Maya Patel', course: 'Data Structures', grade: 'A-', status: 'Approved' },
  { name: 'Jordan Kim', course: 'Network Security', grade: 'B+', status: 'Review' },
  { name: 'Leila Gomez', course: 'Software Testing', grade: 'A', status: 'Approved' },
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/5 transition duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
            HorizonExam preview
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Operations overview</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 dark:bg-slate-900">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {dashboardCards.map((card) => (
                <div key={card.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{card.label}</p>
                  <p className={`mt-4 text-3xl font-semibold ${card.accent}`}>{card.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Campus exam load</span>
                <span>Updated 2m ago</span>
              </div>
              <div className="mt-6 h-36 rounded-3xl bg-gradient-to-r from-[#547A95] via-[#2C3947] to-[#C2A56D] opacity-20" />
            </div>
          </div>
        )}

        {activeTab === 'Exams' && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Upcoming schedule</span>
                <span>3 exams today</span>
              </div>
            </div>
            <div className="grid gap-3">
              {examSchedule.map((exam) => (
                <div key={exam.subject} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-slate-900 dark:text-white">{exam.subject}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Room {exam.room}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {exam.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Grades' && (
          <div className="space-y-4">
            {gradeList.map((item) => (
              <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.course}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{item.grade}</span>
                    <span className="rounded-full bg-[#C2A56D]/15 px-3 py-1 text-[#6d552d]">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
