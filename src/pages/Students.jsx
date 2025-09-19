import React from 'react';

const Teachers = () => {
  return (
    <div>
      <h3>Teachers</h3>
      <button>Add Teacher</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map your teachers data here */}
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>Math</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Pagination Component at bottom */}
    </div>
  );
};

export default Teachers;
