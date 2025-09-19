import React, { useEffect, useState } from "react";
import AttendanceForm  from "../components/Attendance/AttendanceForm";
import AttendanceTable from "../components/Attendance/AttendanceTable";
import {
  getAllAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "../api/attendanceApi";
import "../styles/attendance.css";

export default function AttendancePage() {
  const [records, setRecords]       = useState([]);
  const [selected, setSelected]     = useState(null);
  const [showForm, setShowForm]     = useState(false);

  const load = async () => {
    try { setRecords(await getAllAttendance()); }
    catch (e) { console.error(e); setRecords([]); }
  };
  useEffect(() => { load(); }, []);

  /* CRUD */
  const save = async (rec) => {
    rec._id ? await updateAttendance(rec._id, rec)
            : await createAttendance(rec);
    setShowForm(false); setSelected(null); load();
  };

  const remove = async (id) => {
    if (window.confirm("Delete this record?")) { await deleteAttendance(id); load(); }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Management</h2>

      {!showForm && (
        <button className="add-attendance-btn" onClick={() => setShowForm(true)}>
          Add Attendance
        </button>
      )}

      {showForm ? (
        <AttendanceForm
          selectedRec={selected}
          onSubmit={save}
          onCancel={() => { setShowForm(false); setSelected(null);} }
        />
      ) : (
        <AttendanceTable
          records={records}
          onEdit={(r) => { setSelected(r); setShowForm(true);} }
          onDelete={remove}
        />
      )}
    </div>
  );
}
