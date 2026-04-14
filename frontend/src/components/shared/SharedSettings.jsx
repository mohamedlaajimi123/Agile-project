import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, ShieldCheck, Smartphone, Mail, ShieldAlert 
} from 'lucide-react';

export default function SharedSettings({ isDark, t }) {
  const [notifs, setNotifs] = useState({ email: true, push: false });

  const toggleSetting = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-12">
      <header className="text-left">
        <h2 className="text-4xl font-bold tracking-tight">{t.settings || 'Settings'}</h2>
        <p className={`mt-3 text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Secure your Horizon account and manage your preferences.
        </p>
      </header>

      {/* Notifications Section */}
      <section className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 px-2 text-left">
          Preferences
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingCard 
            isDark={isDark} icon={Mail} title="Email Alerts" 
            desc="Receive weekly grade summaries and portal updates."
            active={notifs.email}
            onClick={() => toggleSetting('email')}
          />
          <SettingCard 
            isDark={isDark} icon={Smartphone} title="Push Notifications" 
            desc="Get instant mobile alerts for exam schedule changes."
            active={notifs.push}
            onClick={() => toggleSetting('push')}
          />
        </div>
      </section>

      {/* Security Section */}
      <section className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 px-2 text-left">
          Security
        </h4>
        <div className={`rounded-3xl border overflow-hidden ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-slate-200 shadow-xl shadow-slate-200/50'
        }`}>
          <div className="p-8 border-b border-inherit flex items-center justify-between transition-colors hover:bg-white/5">
            <div className="flex gap-5 items-center">
              <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-500"><Lock size={24}/></div>
              <div className="text-left">
                <p className="font-bold text-lg">Account Password</p>
                <p className="text-sm opacity-60">Change your password regularly for better security</p>
              </div>
            </div>
            <button className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-200 hover:bg-slate-300'
            }`}>
              Update
            </button>
          </div>
          
          <div className="p-8 flex items-center justify-between transition-colors hover:bg-white/5">
            <div className="flex gap-5 items-center text-left">
              <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-500"><ShieldCheck size={24}/></div>
              <div>
                <p className="font-bold text-lg">Two-Factor Authentication</p>
                <p className="text-sm opacity-60">Add an extra layer of protection to your login</p>
              </div>
            </div>
            <Toggle enabled={false} />
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className={`p-8 rounded-3xl border text-left flex items-center justify-between ${
        isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex gap-5">
          <div className="text-red-500"><ShieldAlert size={28}/></div>
          <div>
            <p className="font-bold text-red-500">Deactivate Portal Access</p>
            <p className={`text-sm ${isDark ? 'text-red-400/60' : 'text-red-800/60'}`}>This action is reversible by contacting administration.</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
          Deactivate
        </button>
      </section>
    </div>
  );
}

function SettingCard({ isDark, icon: Icon, title, desc, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-3xl border cursor-pointer transition-all flex items-start justify-between group ${
        isDark 
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/50' 
          : 'bg-white/80 border-slate-200 shadow-lg shadow-slate-200/50 hover:border-indigo-400'
      }`}
    >
      <div className="flex gap-5 text-left">
        <div className={`p-3 rounded-xl transition-colors ${
          isDark ? 'bg-slate-800 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white' : 'bg-slate-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
        }`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="font-bold text-base">{title}</p>
          <p className="text-sm opacity-50 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
      <Toggle enabled={active} />
    </div>
  );
}

function Toggle({ enabled }) {
  return (
    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${enabled ? 'bg-indigo-500 shadow-inner shadow-indigo-900/20' : 'bg-slate-400/30'}`}>
      <motion.div 
        animate={{ x: enabled ? 26 : 4 }} 
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md" 
      />
    </div>
  );
}