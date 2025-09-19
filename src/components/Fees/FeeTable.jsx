import React from "react";

const FeeTable = ({ fees, onEdit, onDelete }) => (
  <table className="fee-table">
    <thead>
      <tr>
        <th>#</th>
<th>Class</th>
<th>Section</th>
<th>Medium</th>
<th>Tuition</th>
<th>Lab</th>
<th>Sports</th>
<th>Action</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fees) && fees.length > 0 ? (
  fees.map((fee, index) => (
    <tr key={fee._id || index}>
      <td>{index + 1}</td>
      <td>{fee.className}</td>
      <td>{fee.section}</td>
      <td>{fee.medium}</td>
      <td>{fee.tuitionFee}</td>
      <td>{fee.labFee}</td>
      <td>{fee.sportsFee}</td>
      <td>
        <button onClick={() => onEdit(fee)}>Edit</button>
        <button onClick={() => onDelete(fee._id)}>Delete</button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="8">No fee records found.</td>
  </tr>
)}

    </tbody>
  </table>
);

export default FeeTable;
