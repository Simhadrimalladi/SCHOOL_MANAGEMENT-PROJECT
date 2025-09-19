// src/components/Teachers/TeacherTable.jsx
import React from "react";
import "../../styles/teacher.css";

const TeacherTable = ({ teachers, onEdit, onDelete }) => {
  // make sure we always work with an array
  const rows = Array.isArray(teachers) ? teachers : [];

  return (
    <table className="teacher-table">
      <thead>
        <tr>
          <th>Sr No.</th>
          <th>Full Name</th>
          <th>Teacher ID</th>
          <th>Email</th>
          <th>Phone</th>
         
          <th>Medium</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
              No teachers found.
            </td>
          </tr>
        ) : (
          rows.map((t, idx) => (
            <tr key={t._id}>
              <td>{idx + 1}</td>
              <td>{`${t.firstName || "A"} ${t.lastName || ""}`}</td>
              <td>{t.teacherId || t._id || "-"}</td>
              <td>{t.email || "-"}</td>
              
              <td>{t.phoneNumber || t.phone || "-"}</td>
              <td>{t.rollNumber || ""}</td>
              <td>{t.classAssigned || "-"}</td>

              <td>
                <button className="edit-btn" onClick={() => onEdit(t)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(t._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TeacherTable;
