import React, { useState, useEffect } from "react";
import TeacherForm from "../components/Teachers/TeacherForm";
import TeacherTable from "../components/Teachers/TeacherTable";
import { fetchTeachers, createTeacher, updateTeacher, deleteTeacher } from "../api/teacherApi";
import "../styles/teacher.css";  // make sure filename is exactly this

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadTeachers = async () => {
    try {
      const data = await fetchTeachers();
      setTeachers(data); // if your API returns {data: [...]}, use setTeachers(data.data)
    } catch (error) {
      console.error("Failed to load teachers", error);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleAdd = () => {
    setSelectedTeacher(null);
    setShowForm(true);
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      await deleteTeacher(id);
      loadTeachers();
    }
  };

  const handleSubmit = async (teacher) => {
    if (teacher._id) {
      await updateTeacher(teacher._id, teacher);
    } else {
      await createTeacher(teacher);
    }
    setShowForm(false);
    setSelectedTeacher(null);
    loadTeachers();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="teachers-container">
      <h2>Teacher Management</h2>
      {!showForm && <button className="add-teacher-btn" onClick={handleAdd}>Add Teacher</button>}
      {showForm ? (
        <TeacherForm teacher={selectedTeacher} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <TeacherTable teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default TeachersPage;
