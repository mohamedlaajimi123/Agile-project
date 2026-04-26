import React, { useState } from 'react';
import { Bell, CalendarDays, Search } from 'lucide-react';

const tabs = ['Dashboard', 'Exams', 'Grades'];

const dashboardCards = [
  { label: 'Active Exams', value: '14', color: 'text-indigo-400' },
  { label: 'Pending Rooms', value: '8', color: 'text-violet-400' },
  { label: 'Confirmed Students', value: '1,042', color: 'text-pink-400' },
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
    <div className="w-full max-w-2xl rounded-2xl border border-indigo-200 bg-white/50 p-6 shadow-lg backdrop-blur-xl transition duration-300 dark:border-white/10 dark:bg-white/5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Operations overview</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-gray-400">Live system preview</p>
        </div>
        <button
          type="button"
          className="relative rounded-lg border border-indigo-200 bg-white/50 p-2 text-zinc-600 transition-all hover:bg-white/70 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            2
          </span>
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-gray-500" />
          <input
            type="text"
            value="Exam"
            readOnly
            className="w-full rounded-lg border border-indigo-200 bg-white/50 py-2 pl-10 pr-4 text-sm text-zinc-900 outline-none transition-all focus:ring-2 focus:ring-indigo-400/50 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <div className="flex rounded-lg border border-indigo-200 bg-white/50 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-indigo-500/30 to-violet-500/30 text-zinc-900 shadow-sm dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {dashboardCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-indigo-100 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-gray-400">{card.label}</p>
                  <p className={`mt-3 text-3xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-white/50 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-gray-400">
                <span>Campus exam load</span>
                <span>Updated 2m ago</span>
              </div>
              <div className="mt-5 flex h-32 items-end gap-2 rounded-lg bg-indigo-500/10 p-4">
                {['h-10', 'h-16', 'h-12', 'h-24', 'h-14', 'h-28', 'h-20'].map((height, index) => (
                  <span
                    key={height}
                    className={`flex-1 rounded-t-lg ${height} ${index % 2 ? 'bg-violet-500/60' : 'bg-indigo-500/60'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Exams' && (
          <div className="space-y-3">
            {examSchedule.map((exam) => (
              <div key={exam.subject} className="rounded-2xl border border-indigo-100 bg-white/50 p-4 transition-all hover:border-indigo-400/50 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-400">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{exam.subject}</p>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-gray-400">Room {exam.room}</p>
                    </div>
                  </div>
                  <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400">
                    {exam.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Grades' && (
          <div className="space-y-3">
            {gradeList.map((item) => (
              <div key={item.name} className="rounded-2xl border border-indigo-100 bg-white/50 p-4 transition-all hover:border-indigo-400/50 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-gray-400">{item.course}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="rounded bg-slate-100 px-2 py-1 font-semibold dark:bg-white/10">{item.grade}</span>
                    <span className={`rounded px-2 py-1 text-xs font-semibold ${
                      item.status === 'Approved'
                        ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400'
                    }`}>
                      {item.status}
                    </span>
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
