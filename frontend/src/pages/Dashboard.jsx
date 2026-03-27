import { LogOut, LayoutDashboard, BookOpen, Calendar, User } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex">
      {/* Simple Sidebar */}
      <aside className="w-64 bg-[#1E3A5F] text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Horizon Portal</h2>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-yellow-400"><LayoutDashboard size={20}/> Dashboard</div>
          <div className="flex items-center gap-3 opacity-70 hover:opacity-100 cursor-pointer"><BookOpen size={20}/> Courses</div>
          <div className="flex items-center gap-3 opacity-70 hover:opacity-100 cursor-pointer"><Calendar size={20}/> Schedule</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, Student</h1>
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
          >
            <LogOut size={20}/> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-gray-500 mb-2">GPA</h3>
            <p className="text-3xl font-bold text-[#1E3A5F] dark:text-[#4A7BA7]">3.8</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-gray-500 mb-2">Attendance</h3>
            <p className="text-3xl font-bold text-[#1E3A5F] dark:text-[#4A7BA7]">94%</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-gray-500 mb-2">Credits</h3>
            <p className="text-3xl font-bold text-[#1E3A5F] dark:text-[#4A7BA7]">120/180</p>
          </div>
        </div>
      </main>
    </div>
  );
}