import React, { useState, useEffect } from "react";
import "../../styles/attendance.css";

const empty = {
  firstName: "",
  lastName : "",
  className: "",
  section  : "",
  medium   : "",
  status   : "Present"   // Present | Absent
};

export default function AttendanceForm({ selectedRec, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => { setForm(selectedRec ? selectedRec : empty); }, [selectedRec]);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); onSubmit(form); };

  return (
    <form className="attendance-form" onSubmit={submit}>
      <h3>{selectedRec ? "Edit Attendance" : "Add Attendance"}</h3>

      <div className="form-grid">
        <input name="firstName" value={form.firstName} onChange={change} placeholder="First Name" required />
        <input name="lastName"  value={form.lastName}  onChange={change} placeholder="Last Name"  required />
        <input name="className" value={form.className} onChange={change} placeholder="Class"      required />
        <input name="section"   value={form.section}   onChange={change} placeholder="Section"    required />
        <input name="medium"    value={form.medium}    onChange={change} placeholder="Medium"     required />
        <select name="status" value={form.status} onChange={change}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
