// src/pages/StudentsPage.jsx
import React, { useState, useEffect } from "react";
import StudentForm  from "../components/Students/StudentForm";
import StudentTable from "../components/Students/StudentTable";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";
import "../styles/student.css";

export default function StudentsPage() {
  const [students, setStudents]       = useState([]);
  const [selected,  setSelected]      = useState(null);
  const [showForm,  setShowForm]      = useState(false);

  /* ---------- load once ---------- */
  useEffect(() => { load(); }, []);
  const load = async () => {
    try   { setStudents(await getAllStudents()); }
    catch (e) {
      console.error(e.message);
      setStudents([]);        // keeps UI stable
    }
  };

  /* ---------- CRUD handlers ---------- */
  const save = async (stu) => {
    stu._id ? await updateStudent(stu._id, stu)
            : await createStudent(stu);
    cancel();  load();
  };
  const remove = async (id) => {
    if (window.confirm("Delete this student?")) {
      await deleteStudent(id);
      load();
    }
  };
  const cancel = () => { setShowForm(false); setSelected(null); };

  /* ---------- render ---------- */
  return (
    <div className="students-container">
      <h2>Student Management</h2>

      {!showForm && (
        <button className="add-student-btn" onClick={() => setShowForm(true)}>
          Add Student
        </button>
      )}

      {showForm ? (
        <StudentForm
          selectedStudent={selected}
          onSubmit={save}
          onCancel={cancel}
        />
      ) : (
        <StudentTable
          students={students}
          onEdit={(s) => { setSelected(s); setShowForm(true); }}
          onDelete={remove}
        />
      )}
    </div>
  );
}
