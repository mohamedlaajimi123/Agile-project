import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Updated import pointing to the specific file in the Login folder
import HorizonLogin from './pages/Login/HorizonLogin'; 
import StudentPortal from './pages/StudentPortal';
import ProfessorPortal from './pages/ProfessorPortal';
import AdminPortal from './pages/AdminPortal';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Updated element to use HorizonLogin */}
        <Route path="/" element={<HorizonLogin />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/professor" element={<ProfessorPortal />} />
        <Route path='/admin' element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}