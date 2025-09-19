// src/components/Students/StudentForm.jsx
import React, { useState, useEffect } from "react";
import "../../styles/student.css";

const initialFormState = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  age: "",
  className: "",
  section: "",
  phoneNumber: "",
  email: "",
};

const StudentForm = ({ selectedStudent, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (selectedStudent) setFormData({ ...selectedStudent });
    else setFormData(initialFormState);
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h3>{selectedStudent ? "Edit Student" : "Add Student"}</h3>

      <label>First Name</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} required />

      <label>Middle Name</label>
      <input name="middleName" value={formData.middleName} onChange={handleChange} />

      <label>Last Name</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} required />

      <label>Gender</label>
      <input name="gender" value={formData.gender} onChange={handleChange} />

      <label>Age</label>
      <input name="age" type="number" value={formData.age} onChange={handleChange} />

      <label>Class</label>
      <input name="className" value={formData.className} onChange={handleChange} />

      <label>Section</label>
      <input name="section" value={formData.section} onChange={handleChange} />

      <label>Phone Number</label>
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <div className="form-actions">
        <button type="submit">{selectedStudent ? "Update" : "Save"}</button>
        {onCancel && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
