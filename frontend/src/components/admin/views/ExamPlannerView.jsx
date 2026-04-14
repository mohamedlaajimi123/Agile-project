import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ChevronDown } from 'lucide-react';
import { ROOMS, TIME_SLOTS, EXAM_DATA } from '../../../data/admin/mockData';

export default function ExamPlannerView({ isDark, t, gridAssignments, setGridAssignments, unassignedExams, setUnassignedExams, selectedLevel, setSelectedLevel, selectedBachelor, setSelectedBachelor }) {
  const [isAutoAllocating, setIsAutoAllocating] = useState(false);
  const [draggedExam, setDraggedExam] = useState(null);
  
  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState(false);
  const [isBachelorMenuOpen, setIsBachelorMenuOpen] = useState(false);

  const levelOptions = ['All Levels', 'L1', 'L2', 'L3', 'M1', 'M2'];
  const bachelorOptions = ['All Bachelors', 'Computer Science', 'Digital Arts', 'Business', 'Engineering'];

  const filteredUnassignedExams = unassignedExams.filter(exam => {
    const levelMatch = selectedLevel === 'All Levels' || exam.level === selectedLevel;
    const bachelorMatch = selectedBachelor === 'All Bachelors' || exam.bachelor === selectedBachelor;
    return levelMatch && bachelorMatch;
  });

  const handleSmartAllocation = () => {
    setIsAutoAllocating(true);
    setTimeout(() => {
      const newAssignments = {};
      EXAM_DATA.forEach((exam) => {
        const roomIndex = exam.id % ROOMS.length;
        const timeIndex = (exam.id - 1) % TIME_SLOTS.length;
        newAssignments[exam.id] = { room: ROOMS[roomIndex].id, time: TIME_SLOTS[timeIndex] };
      });
      setGridAssignments(newAssignments);
      setUnassignedExams([]);
      setIsAutoAllocating(false);
    }, 2000);
  };

  const handleResetAll = () => {
    setGridAssignments({});
    setUnassignedExams(EXAM_DATA);
    setSelectedLevel('All Levels');
    setSelectedBachelor('All Bachelors');
  };

  const handleDropExam = (roomId, timeSlot, examId) => {
    const exam = unassignedExams.find(e => e.id === examId);
    if (exam) {
      setGridAssignments(prev => ({
        ...prev,
        [examId]: { room: roomId, time: timeSlot }
      }));
      setUnassignedExams(prev => prev.filter(e => e.id !== examId));
    }
  };

  const getAssignedExamForCell = (roomId, timeSlot) => {
    for (let [examId, assignment] of Object.entries(gridAssignments)) {
      if (assignment.room === roomId && assignment.time === timeSlot) {
        const examData = EXAM_DATA.find(e => e.id === parseInt(examId));
        return { id: parseInt(examId), ...examData };
      }
    }
    return null;
  };

  return (
    <motion.div
      key="exam-planner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex gap-4">
        <motion.button
          onClick={handleSmartAllocation}
          disabled={isAutoAllocating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-70 transition-all flex items-center gap-2"
        >
          {isAutoAllocating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Smart Allocation Running...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {t.runSmartAllocation}
            </>
          )}
        </motion.button>
        <motion.button
          onClick={handleResetAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 border ${
            isDark
              ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              : 'bg-white/50 border-indigo-200 text-zinc-900 hover:bg-white/70'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          {t.resetAll}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative z-40 rounded-2xl backdrop-blur-xl border p-6 h-[600px] flex flex-col ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-indigo-200 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">
              {t.unassignedExams} ({filteredUnassignedExams.length})
            </h3>
          </div>

          <div className="flex gap-3 mb-4 relative z-50">
            {/* Custom Level Dropdown */}
            <div className="relative flex-1 min-w-0">
              <motion.button
                onClick={() => {
                  setIsLevelMenuOpen(!isLevelMenuOpen);
                  setIsBachelorMenuOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-1 px-3 py-2 text-sm rounded-lg border flex items-center justify-between gap-2 transition-all ${
                  isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white/50 border-indigo-200 text-zinc-900 hover:bg-white/70'
                }`}
              >
                <span className="truncate">{selectedLevel}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isLevelMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isLevelMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute top-full mt-2 left-0 w-max min-w-full rounded-xl border p-1 shadow-2xl backdrop-blur-2xl z-[100] ${
                      isDark ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-indigo-200'
                    }`}
                  >
                    {levelOptions.map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setSelectedLevel(level);
                          setIsLevelMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                          selectedLevel === level 
                            ? (isDark ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'bg-indigo-100 text-indigo-700 font-bold') 
                            : isDark ? 'text-gray-300 hover:bg-white/5' : 'text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Bachelor Dropdown (FIXED: left-0 so it expands over the table) */}
            <div className="relative flex-1 min-w-0">
              <motion.button
                onClick={() => {
                  setIsBachelorMenuOpen(!isBachelorMenuOpen);
                  setIsLevelMenuOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-1 px-3 py-2 text-sm rounded-lg border flex items-center justify-between gap-2 transition-all ${
                  isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white/50 border-indigo-200 text-zinc-900 hover:bg-white/70'
                }`}
              >
                <span className="truncate">{selectedBachelor}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isBachelorMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isBachelorMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute top-full mt-2 left-0 w-max min-w-full rounded-xl border p-1 shadow-2xl backdrop-blur-2xl z-[100] ${
                      isDark ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-indigo-200'
                    }`}
                  >
                    {bachelorOptions.map((bachelor) => (
                      <button
                        key={bachelor}
                        onClick={() => {
                          setSelectedBachelor(bachelor);
                          setIsBachelorMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                          selectedBachelor === bachelor 
                            ? (isDark ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'bg-indigo-100 text-indigo-700 font-bold') 
                            : isDark ? 'text-gray-300 hover:bg-white/5' : 'text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        {bachelor}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1 pr-2 relative z-10">
            {filteredUnassignedExams.length > 0 ? (
              filteredUnassignedExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  draggable
                  onDragStart={() => setDraggedExam(exam.id)}
                  onDragEnd={() => setDraggedExam(null)}
                  className={`p-4 rounded-lg border cursor-move hover:border-amber-400/70 transition-all ${
                    isDark 
                      ? 'bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-400/30' 
                      : 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-300'
                  }`}
                >
                  <p className="font-semibold text-sm">{exam.course}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{exam.students} {t.students}</span>
                    <span className={`text-xs px-2 py-1 rounded border ${
                      isDark 
                        ? 'bg-amber-500/30 border-amber-400/50 text-amber-300' 
                        : 'bg-amber-500/30 border-amber-400 text-amber-700'
                    }`}>
                      {exam.aiScore}%
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>All exams assigned ✓</p>
            )}
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-4 relative z-10">
          <h3 className="text-lg font-bold">{t.examScheduleGrid}</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-2xl backdrop-blur-xl border overflow-hidden ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-indigo-200 shadow-lg'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/60 border-indigo-200'}`}>
                    <th className={`text-left px-4 py-3 font-semibold w-32 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                      {t.room}
                    </th>
                    {TIME_SLOTS.map((time) => (
                      <th key={time} className={`text-center px-4 py-3 font-semibold min-w-48 ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                        {time}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROOMS.map((room) => (
                    <motion.tr
                      key={room.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`border-b last:border-0 ${isDark ? 'border-white/10' : 'border-indigo-100'}`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold">{room.name}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-500'}`}>Cap: {room.capacity}</p>
                      </td>
                      {TIME_SLOTS.map((time) => {
                        const assignedExam = getAssignedExamForCell(room.id, time);
                        return (
                          <motion.td
                            key={`${room.id}-${time}`}
                            className={`p-2 border-l transition-colors ${
                              isDark ? 'border-white/10' : 'border-indigo-100'
                            } ${draggedExam ? (isDark ? 'bg-white/5' : 'bg-white/60') : ''}`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add(isDark ? 'bg-white/10' : 'bg-indigo-50');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove(isDark ? 'bg-white/10' : 'bg-indigo-50');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove(isDark ? 'bg-white/10' : 'bg-indigo-50');
                              if (draggedExam) {
                                handleDropExam(room.id, time, draggedExam);
                              }
                            }}
                          >
                            {assignedExam ? (
                              <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`p-3 rounded-lg border ${
                                  isDark
                                    ? 'bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border-indigo-400/30'
                                    : 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-300 shadow-sm'
                                }`}
                              >
                                <p className="font-semibold text-sm line-clamp-1" title={assignedExam.course}>
                                  {assignedExam.course}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{assignedExam.students}👥</span>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="relative group/badge"
                                  >
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border ${
                                      isDark 
                                        ? 'bg-green-500/40 border-green-400/50 text-green-300' 
                                        : 'bg-green-500/40 border-green-400 text-green-700'
                                    }`}>
                                      <Sparkles className="w-3 h-3" /> AI
                                    </span>
                                    <motion.div
                                      initial={{ opacity: 0, y: -10 }}
                                      whileHover={{ opacity: 1, y: -20 }}
                                      className={`absolute left-1/2 -translate-x-1/2 w-40 text-center rounded-lg p-2 text-xs z-50 pointer-events-none whitespace-normal border ${
                                        isDark 
                                          ? 'bg-gray-950 border-white/20 text-gray-200' 
                                          : 'bg-white border-indigo-300 text-zinc-900 shadow-lg'
                                      }`}
                                    >
                                      <p className="font-semibold text-green-400 mb-1">{assignedExam.aiScore}% Confidence</p>
                                      <p>{assignedExam.reasoning}</p>
                                    </motion.div>
                                  </motion.div>
                                </div>
                              </motion.div>
                            ) : (
                              <div className={`text-center py-4 text-xs ${isDark ? 'text-gray-500' : 'text-zinc-500'}`}>
                                {draggedExam ? 'Drop here' : '—'}
                              </div>
                            )}
                          </motion.td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}