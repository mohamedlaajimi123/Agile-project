import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, Lock, Shield, Phone, Camera, Save, Edit3, ChevronLeft } from 'lucide-react';

// --- PROFESSIONAL STANDARDS: LOGIC IMPORTS ---
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import { studentService } from '../../api/mockApi';

export default function StudentProfile({ t, setCurrentPage }) {
  // 1. Grab global state & the new Toast trigger
  const { isDark, showToast } = useAuth();
  
  // 2. Fetch live data from your mock service
  const { data: student, loading, refetch } = useFetch(studentService.getProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
  });

  // 3. Keep local inputs in sync with the "database"
  useEffect(() => {
    if (student) {
      setFormData({
        phone: student.phone || '+216 55 123 456',
        email: student.email,
      });
    }
  }, [student]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  // 4. The "Transfer" logic with professional feedback
  const handleSave = async () => {
    try {
      await studentService.updateProfile(formData); // Sync with mock database
      await refetch(); // Pull fresh data back to UI
      setIsEditing(false);
      showToast(t.profileUpdated || "Profile Updated Successfully!", "success");
    } catch (err) {
      showToast("Sync Error: Could not save changes.", "error");
    }
  };

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'}`}>
      
      {/* Original Background Orbs */}
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-30" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-30" />
        </div>
      )}

      <main className="relative z-10 p-8 min-h-screen max-w-4xl mx-auto">
        <motion.button onClick={() => setCurrentPage('portal')} whileHover={{ x: -4 }} className={`flex items-center gap-2 mb-8 font-semibold transition-all ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}>
          <ChevronLeft className="w-5 h-5" /> {t.backToPortal}
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t.profile}</h2>
            <motion.button 
                onClick={isEditing ? handleSave : () => setIsEditing(true)} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${isEditing ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' : 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30'}`}
            >
              {isEditing ? <><Save className="w-4 h-4" /> {t.saveChanges}</> : <><Edit3 className="w-4 h-4" /> {t.editProfile}</>}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className={`rounded-2xl backdrop-blur-xl border p-6 text-center transition-all duration-300 flex flex-col items-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {student?.name ? student.name.charAt(0) : '...'}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-lg"><Camera className="w-4 h-4" /></button>
                </div>
                
                {/* Dynamic Student Identity */}
                <h3 className="text-xl font-bold">{loading ? "..." : student?.name}</h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{student?.id}</p>
                
                <div className={`w-full mt-6 pt-6 border-t text-left space-y-4 ${isDark ? 'border-white/10' : 'border-slate-300/30'}`}>
                  <div><p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Program</p><p className="font-medium flex items-center gap-2"><BookOpen className="w-4 h-4 text-violet-400" /> {student?.program}</p></div>
                  <div><p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Current Semester</p><p className="font-medium">{student?.semester}</p></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-indigo-400" /> {t.contactInfo}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Email Address</label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} className={`w-full pl-10 pr-4 py-2 rounded-lg transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${isDark ? 'bg-white/5 border-white/10 text-white disabled:opacity-50' : 'bg-white/50 border-slate-300/50 text-slate-900 disabled:opacity-50'}`} />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t.phone}</label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className={`w-full pl-10 pr-4 py-2 rounded-lg transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${isDark ? 'bg-white/5 border-white/10 text-white disabled:opacity-50' : 'bg-white/50 border-slate-300/50 text-slate-900 disabled:opacity-50'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-violet-400" /> {t.security}</h3>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-opacity-20 bg-indigo-500/10 border-indigo-500/20">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Lock className="w-5 h-5" /></div>
                    <div>
                      <p className="font-semibold">Password</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'}`}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}