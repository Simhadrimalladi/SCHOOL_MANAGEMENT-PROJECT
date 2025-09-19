import React, { useState, useEffect } from "react";

/* ------------ SHARED STYLES ------------ */
import "../styles/dashboard.css";
import "../styles/teacher.css";
import "../styles/student.css";
import "../styles/fee.css";
import "../styles/attendance.css";

/* ------------ TEACHERS  ------------ */
import TeacherForm  from "../components/Teachers/TeacherForm";
import TeacherTable from "../components/Teachers/TeacherTable";
import {
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/teacherApi";

/* ------------ STUDENTS  ------------ */
import StudentForm  from "../components/Students/StudentForm";
import StudentTable from "../components/Students/StudentTable";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";

/* ------------ FEES ------------ */
import FeeForm   from "../components/Fees/FeeForm";
import FeeTable  from "../components/Fees/FeeTable";
import {
  getAllFees,
  createFee,
  updateFee,
  deleteFee,
} from "../api/feeApi";

/* ------------ ATTENDANCE ------------ */
import AttendanceForm  from "../components/Attendance/AttendanceForm";
import AttendanceTable from "../components/Attendance/AttendanceTable";
import {
  getAllAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "../api/attendanceApi";

export default function Dashboard() {
  const [active, setActive] = useState("home");

  const [teachers, setTeachers]       = useState([]);
  const [selectedTeacher, setSelectedTeacher]   = useState(null);
  const [showTeacherForm, setShowTeacherForm]   = useState(false);

  const [students, setStudents]       = useState([]);
  const [selectedStudent, setSelectedStudent]   = useState(null);
  const [showStudentForm, setShowStudentForm]   = useState(false);

  const [fees, setFees]               = useState([]);
  const [selectedFee, setSelectedFee]           = useState(null);
  const [showFeeForm, setShowFeeForm]       = useState(false);

const [attendance, setAttendance] = useState([]);
const [selectedAttendance, setSelectedAttendance] = useState(null);
const [showAttendanceForm, setShowAttendanceForm] = useState(false);

 useEffect(() => {
  loadTeachers();
  loadStudents();
  loadFees();
  loadAttendance(); // ✅ this must be called
}, []);

  const loadTeachers = async () => {
    try {
      const data = await fetchTeachers();
      setTeachers(Array.isArray(data) ? data : []);
    }
    catch (err){ console.error("Failed to load teachers", err); }
  };

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    }
    catch (err){ console.error("Failed to load students", err); }
  };

  const loadFees = async () => {
    try {
      const list = await getAllFees();
      setFees(Array.isArray(list) ? list : []);
    } catch (err){ console.error("Failed to load fees", err); }
  };

 const loadAttendance = async () => {
  try {
    const list = await getAllAttendance();
    setAttendance(Array.isArray(list) ? list : []);  // ✅ this updates attendance state
  } catch (err) {
    console.error("Failed to load attendance", err);
  }
};

  const saveTeacher = async (t) => {
    t._id ? await updateTeacher(t._id, t) : await createTeacher(t);
    setShowTeacherForm(false); setSelectedTeacher(null); loadTeachers();
  };

  const deleteTeacherRow = async (id) => {
    if (window.confirm("Delete this teacher?")) {
      await deleteTeacher(id); loadTeachers();
    }
  };

  const saveStudent = async (s) => {
    s._id ? await updateStudent(s._id, s) : await createStudent(s);
    setShowStudentForm(false); setSelectedStudent(null); loadStudents();
  };

  const deleteStudentRow = async (id) => {
    if (window.confirm("Delete this student?")) {
      await deleteStudent(id); loadStudents();
    }
  };

  const saveFee = async (f) => {
    f._id ? await updateFee(f._id, f) : await createFee(f);
    setShowFeeForm(false); setSelectedFee(null); loadFees();
  };

  const deleteFeeRow = async (id) => {
    if (window.confirm("Delete this fee record?")) {
      await deleteFee(id); loadFees();
    }
  };

  const saveAttendance = async (a) => {
    a._id ? await updateAttendance(a._id, a) : await createAttendance(a);
    setShowAttendanceForm(false); setSelectedAttendance(null); loadAttendance();
  };

  const deleteAttendanceRow = async (id) => {
    if (window.confirm("Delete this attendance record?")) {
      await deleteAttendance(id); loadAttendance();
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">eTechno</div>
        <ul>
          {['home', 'teachers', 'students', 'fees', 'attendance'].map(key => (
            <li
              key={key}
              className={active === key ? "active" : ""}
              onClick={() => setActive(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        {active === "home" && (
          <>
            <h2 className="main-heading">Dashboard Overview</h2>
            <div className="stat-column">
              <StatCard icon="👨‍🏫" label="Total Teachers" value={teachers.length} />
              <StatCard icon="🎓" label="Total Students" value={students.length} />
              <StatCard icon="💰" label="Fee Records" value={fees.length} />
              <StatCard icon="📝" label="Attendance Records" value={attendance.length} />
            </div>
          </>
        )}

        {active === "teachers" && (
          <Section title="Teacher Management" showForm={showTeacherForm} onAdd={() => { setSelectedTeacher(null); setShowTeacherForm(true); }} addLabel="Add Teacher" form={<TeacherForm selectedTeacher={selectedTeacher} onSubmit={saveTeacher} onCancel={() => { setShowTeacherForm(false); setSelectedTeacher(null); }} />} table={<TeacherTable teachers={teachers} onEdit={(t) => { setSelectedTeacher(t); setShowTeacherForm(true); }} onDelete={deleteTeacherRow} />} />
        )}

        {active === "students" && (
          <Section title="Student Management" showForm={showStudentForm} onAdd={() => { setSelectedStudent(null); setShowStudentForm(true); }} addLabel="Add Student" form={<StudentForm selectedStudent={selectedStudent} onSubmit={saveStudent} onCancel={() => { setShowStudentForm(false); setSelectedStudent(null); }} />} table={<StudentTable students={students} onEdit={(s) => { setSelectedStudent(s); setShowStudentForm(true); }} onDelete={deleteStudentRow} />} />
        )}

        {active === "fees" && (
          <Section title="Fee Management" showForm={showFeeForm} onAdd={() => { setSelectedFee(null); setShowFeeForm(true); }} addLabel="Add Fee" form={<FeeForm selectedFee={selectedFee} onSubmit={saveFee} onCancel={() => { setShowFeeForm(false); setSelectedFee(null); }} />} table={<FeeTable fees={fees} onEdit={(f) => { setSelectedFee(f); setShowFeeForm(true); }} onDelete={deleteFeeRow} />} />
        )}

        {active === "attendance" && (
          <Section title="Attendance Management" showForm={showAttendanceForm} onAdd={() => { setSelectedAttendance(null); setShowAttendanceForm(true); }} addLabel="Add Attendance" form={<AttendanceForm selectedRec={selectedAttendance} onSubmit={saveAttendance} onCancel={() => { setShowAttendanceForm(false); setSelectedAttendance(null); }} />} table={<AttendanceTable records={attendance} onEdit={(a) => { setSelectedAttendance(a); setShowAttendanceForm(true); }} onDelete={deleteAttendanceRow} />} />
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card-col">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function Section({ title, showForm, onAdd, addLabel, form, table }) {
  return (
    <div className={`${title.split(" ")[0].toLowerCase()}-container`}>
      <h2>{title}</h2>
      {!showForm && (
        <button className="add-btn" onClick={onAdd}>{addLabel}</button>
      )}
      {showForm ? form : table}
    </div>
  );
}
