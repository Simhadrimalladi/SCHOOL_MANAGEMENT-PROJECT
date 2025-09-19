import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";import ParentsPage from './pages/ParentsPage';
import FeesPage from './pages/FeesPage'; // ✅ Corrected path
import FeeTable from "./components/Fees/FeeTable";
import AttendancePage from "./pages/AttendancePage";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/students" element={<StudentsPage />} />        <Route path="/parents" element={<ParentsPage />} />
        <Route path="/fees" element={<FeesPage />} /> {/* ✅ */}
         <Route path="/attendance" element={<AttendancePage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
