import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Shield, Phone, Camera, Save, 
  Edit3, ChevronLeft, Briefcase, X, Image as ImageIcon 
} from 'lucide-react';

export default function SharedProfile({ 
  isDark, 
  t, 
  onBack, 
  user, 
  roleLabel, 
  customFields, 
  onSaveProfile 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const fileInputRef = useRef(null); // Reference for the hidden file explorer

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSave = async () => {
    if (onSaveProfile) {
      await onSaveProfile(formData);
    }
    setIsEditing(false);
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '...';

  // Function to trigger the hidden file input
  const handleFilePicker = () => {
    fileInputRef.current?.click();
    setShowPhotoOptions(false);
  };

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'}`}>
      
      {/* Hidden File Input for "Choose Existing" */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => console.log("File selected:", e.target.files[0])} 
      />

      {/* Background Orbs */}
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-30" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-30" />
        </div>
      )}

      <main className="relative z-10 p-8 min-h-screen max-w-4xl mx-auto">
        <motion.button onClick={onBack} whileHover={{ x: -4 }} className={`flex items-center gap-2 mb-8 font-semibold transition-all ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}>
          <ChevronLeft className="w-5 h-5" /> {t.backToPortal || 'Back'}
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t.profile || 'Profile'}</h2>
            <motion.button 
              onClick={isEditing ? handleSave : () => setIsEditing(true)} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${isEditing ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' : 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30'}`}
            >
              {isEditing ? <><Save className="w-4 h-4" /> {t.saveChanges || 'Save'}</> : <><Edit3 className="w-4 h-4" /> {t.editProfile || 'Edit'}</>}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className={`rounded-2xl backdrop-blur-xl border p-6 text-center transition-all duration-300 flex flex-col items-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {getInitials(user?.name)}
                  </div>
                  
                  {/* Camera Icon - Now triggers the Photo Panel */}
                  <button 
                    onClick={() => setShowPhotoOptions(true)}
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all shadow-lg hover:scale-110 active:scale-90"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold">{user?.name || '...'}</h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{roleLabel}</p>
                
                {customFields && customFields.length > 0 && (
                  <div className={`w-full mt-6 pt-6 border-t text-left space-y-4 ${isDark ? 'border-white/10' : 'border-slate-300/30'}`}>
                    {customFields.map((field, index) => (
                      <div key={index}>
                        <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          {field.label}
                        </p>
                        <p className="font-medium flex items-center gap-2">
                          {field.icon || <Briefcase className="w-4 h-4 text-violet-400" />} {field.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-indigo-400" /> {t.contactInfo || 'Contact Info'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Email Address</label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} className={`w-full pl-10 pr-4 py-2 rounded-lg transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${isDark ? 'bg-white/5 border-white/10 text-white disabled:opacity-50' : 'bg-white/50 border-slate-300/50 text-slate-900 disabled:opacity-50'}`} />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t.phone || 'Phone Number'}</label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className={`w-full pl-10 pr-4 py-2 rounded-lg transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${isDark ? 'bg-white/5 border-white/10 text-white disabled:opacity-50' : 'bg-white/50 border-slate-300/50 text-slate-900 disabled:opacity-50'}`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-violet-400" /> {t.security || 'Security'}</h3>
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

      {/* --- PHOTO SELECTION MODAL --- */}
      <AnimatePresence>
        {showPhotoOptions && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhotoOptions(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl overflow-hidden ${
                isDark ? 'bg-slate-900 border border-white/10' : 'bg-white border border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Update Photo</h3>
                <button 
                  onClick={() => setShowPhotoOptions(false)}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => { alert('Accessing Camera...'); setShowPhotoOptions(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border-2 border-transparent ${
                    isDark ? 'bg-white/5 hover:border-indigo-500/50 hover:bg-white/10' : 'bg-slate-50 hover:border-indigo-500/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                    <Camera size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Take a Photo</p>
                    <p className={`text-sm opacity-60`}>Use device camera</p>
                  </div>
                </button>

                <button
                  onClick={handleFilePicker}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border-2 border-transparent ${
                    isDark ? 'bg-white/5 hover:border-violet-500/50 hover:bg-white/10' : 'bg-slate-50 hover:border-violet-500/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="p-3 bg-violet-500 rounded-xl text-white shadow-lg shadow-violet-500/30">
                    <ImageIcon size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Choose Existing</p>
                    <p className="text-sm opacity-60">Upload from gallery</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}