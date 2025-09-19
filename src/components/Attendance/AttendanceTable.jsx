import React from "react";
import "../../styles/attendance.css";

export default function AttendanceTable({ records, onEdit, onDelete }) {
  const list = Array.isArray(records) ? records : [];

  return (
    <table className="attendance-table">
      <thead>
        <tr>
          <th>#</th><th>Name</th><th>Class</th><th>Section</th>
          <th>Medium</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 ? (
          <tr><td colSpan="7" style={{padding:"20px"}}>No attendance records.</td></tr>
        ) : (
          list.map((r, i) => (
            <tr key={r._id || i}>
              <td>{i + 1}</td>
              <td>{`${r.firstName} ${r.lastName}`}</td>
              <td>{r.className}</td>
              <td>{r.section}</td>
              <td>{r.medium}</td>
              <td className={r.status === "Present" ? "present" : "absent"}>{r.status}</td>
              <td>
                <button className="edit-btn"   onClick={() => onEdit(r)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
