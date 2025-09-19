// src/components/Teachers/TeacherForm.jsx
import React, { useState, useEffect } from "react";
import "../../styles/teacher.css";

const BLANK = {
  firstName:      "",
  lastName:       "",
  teacherId:      "",
  email:          "",
  phoneNumber:    "",

  medium:         "",
  classAssigned:  "",
  section:        ""
};

const TeacherForm = ({ selectedTeacher, onSubmit, onCancel }) => {
  const [data, setData] = useState(BLANK);

  /* ─── load selected teacher into form ─── */
  useEffect(() => {
    setData(selectedTeacher ? { ...BLANK, ...selectedTeacher } : BLANK);
  }, [selectedTeacher]);

  /* ─── handle changes ─── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* ─── save / update ─── */
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple required‑field check
    if (!data.firstName.trim() || !data.email.trim()) {
      alert("First name and email are required.");
      return;
    }

    onSubmit(data);
  };

  return (
    <form className="teacher-form" onSubmit={handleSubmit}>
      <h3>{selectedTeacher ? "Edit Teacher" : "Add Teacher"}</h3>

      <div className="form-grid">
        <input
          name="firstName"
          placeholder="First Name*"
          value={data.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name*"
          value={data.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="teacherId"
          placeholder="Teacher ID"
          value={data.teacherId}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={data.phoneNumber}
          onChange={handleChange}
        />
        
        <input
          name="medium"
          placeholder="Medium"
          value={data.medium}
          onChange={handleChange}
        />
        <input
          name="classAssigned"
          placeholder="Class Assigned"
          value={data.classAssigned}
          onChange={handleChange}
        />
        <input
          name="section"
          placeholder="Section"
          value={data.section}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {selectedTeacher ? "Update" : "Save"}
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
