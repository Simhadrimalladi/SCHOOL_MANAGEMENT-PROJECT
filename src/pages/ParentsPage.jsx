// src/pages/ParentsPage.jsx
import React, { useState } from 'react';
import ParentTable from '../components/parents/ParentTable';
import ParentForm from '../components/parents/ParentForm';

export default function ParentsPage() {
  const [editParent, setEditParent] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);

  const refreshTable = () => {
    setReloadTable(prev => !prev);
    setEditParent(null);
  };

  return (
    <div>
      <h1>Parents Management</h1>
      <ParentForm 
        editData={editParent} 
        onSuccess={refreshTable} 
        onCancel={() => setEditParent(null)} 
      />
      <ParentTable key={reloadTable} onEdit={setEditParent} />
    </div>
  );
}
