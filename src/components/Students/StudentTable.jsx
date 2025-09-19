import React from "react";
import "../../styles/student.css";




const StudentTable = ({ students, onEdit, onDelete }) => {
  // Ensure students is an array
  const safeStudents = Array.isArray(students) ? students : [];
const safe = Array.isArray(students) ? students : [];

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Full Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Class</th>
          <th>Section</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeStudents.length === 0 ? (
          <tr>
            <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
              No students found.
            </td>
          </tr>
        ) : (
          safeStudents.map((s, idx) => (
            <tr key={s._id}>
              <td>{idx + 1}</td>
              <td>{`${s.firstName || "-"} ${s.middleName || ""} ${s.lastName || ""}`}</td>
              <td>{s.gender || "-"}</td>
              <td>{s.age || "-"}</td>
              <td>{s.className || "-"}</td>
              <td>{s.section || "-"}</td>
              <td>{s.phoneNumber || "-"}</td>
              <td>{s.email || "-"}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(s)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
export default StudentTable;
