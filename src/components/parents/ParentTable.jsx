// src/components/parents/ParentTable.jsx
import React, { useEffect, useState } from 'react';
import { fetchParents, deleteParent } from '../../api/parentApi';
import '../../styles/parents.css';  // updated pat

export default function ParentTable({ onEdit }) {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadParents = async () => {
    try {
      setLoading(true);
      const res = await fetchParents();
      setParents(res.data.data);
    } catch (err) {
      alert('Failed to load parents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this parent?')) {
      try {
        await deleteParent(id);
        loadParents();
      } catch {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading parents...</p>;

  return (
    <table className="parent-table">
      <thead>
        <tr>
          <th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Student</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {parents.map(parent => (
          <tr key={parent._id}>
            <td>{parent.firstName}</td>
            <td>{parent.lastName}</td>
            <td>{parent.email}</td>
            <td>{parent.phone}</td>
            <td>{parent.address}</td>
            <td>{parent.studentId ? `${parent.studentId.firstName} ${parent.studentId.lastName}` : 'N/A'}</td>
            <td>
              <button onClick={() => onEdit(parent)}>Edit</button>
              <button onClick={() => handleDelete(parent._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
