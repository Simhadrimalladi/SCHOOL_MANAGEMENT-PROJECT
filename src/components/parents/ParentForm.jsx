// src/components/parents/ParentForm.jsx
import React, { useState, useEffect } from 'react';
import { createParent, updateParent } from '../../api/parentApi';
import '../../styles/parents.css';
export default function ParentForm({ editData, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    studentId: ''
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        studentId: ''
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await updateParent(editData._id, form);
      } else {
        await createParent(form);
      }
      onSuccess();
    } catch (error) {
      alert('Error saving parent');
    }
  };

  return (
    <form className="parent-form" onSubmit={handleSubmit}>
      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
      <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
      <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="Student ID" required />
      <button type="submit">{editData ? 'Update' : 'Add'} Parent</button>
      {editData && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
