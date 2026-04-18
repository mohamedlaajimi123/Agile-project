import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, BookOpen } from 'lucide-react';
import { fetchWithAuth } from "../../../api/api"; 
import { useFetch } from "../../../hooks/useFetch";

export default function ClassListView({ isDark, t }) {
  const { data: classes, loading, error } = useFetch(() => fetchWithAuth('/classes'));
  const [gpas, setGpas] = useState({});
  const [overallGpa, setOverallGpa] = useState(null);

  const calculateGPA = async (classId) => {
    try {
      const grades = await fetchWithAuth(`/grades/class/${classId}`);
      if (grades.length === 0) {
        setGpas(prev => ({ ...prev, [classId]: 'No grades' }));
        return;
      }
      const average = grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length;
      setGpas(prev => ({ ...prev, [classId]: average.toFixed(2) }));
    } catch (err) {
      setGpas(prev => ({ ...prev, [classId]: 'Error' }));
    }
  };

  const calculateAll = async () => {
    if (!classes) return;
    let totalGpa = 0;
    let count = 0;
    for (const cls of classes) {
      try {
        const grades = await fetchWithAuth(`/grades/class/${cls.class_id}`);
        if (grades.length > 0) {
          const average = grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length;
          totalGpa += average;
          count++;
        }
      } catch (err) {
        // skip
      }
    }
    if (count > 0) {
      setOverallGpa((totalGpa / count).toFixed(2));
    } else {
      setOverallGpa('No data');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <motion.div
      key="class-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.classGPA || 'Class GPA'}</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={calculateAll}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
        >
          <Calculator className="w-4 h-4 inline mr-2" />
          Calculate All
        </motion.button>
      </div>

      {overallGpa && (
        <div className={`p-4 rounded-2xl backdrop-blur-xl border ${
          isDark ? 'bg-green-600/20 border-green-400/30' : 'bg-green-500/20 border-green-300'
        }`}>
          <h3 className="text-lg font-bold">Overall Average GPA: {overallGpa}/20</h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes?.map((cls) => (
          <motion.div
            key={cls.class_id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-2xl backdrop-blur-xl border p-6 ${
              isDark
                ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/30'
                : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-300 shadow-lg'
            }`}
          >
            <BookOpen className={`w-8 h-8 mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className="text-lg font-bold mb-2">{cls.name}</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
              {cls.semester} - {cls.academic_year}
            </p>
            {gpas[cls.class_id] && (
              <p className="text-sm font-semibold mb-4">GPA: {gpas[cls.class_id]}/20</p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => calculateGPA(cls.class_id)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Calculate GPA
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}