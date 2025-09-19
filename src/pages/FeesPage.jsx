// src/pages/FeesPage.jsx
import React, { useState, useEffect } from "react";
import FeeForm from "../components/Fees/FeeForm";
import FeeTable from "../components/Fees/FeeTable";
import { getAllFees, createFee, updateFee, deleteFee } from "../api/feeApi";


import "../styles/fee.css";

const FeesPage = () => {
  const [fees, setFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [showFeeForm, setShowFeeForm] = useState(false);

  // Load fees from backend
  const loadFees = async () => {
 try {
    const data = await getAllFees();
    setFees(Array.isArray(data) ? data : []);   // always an array
  } catch (error) {
   console.error("Failed to load fees", error);
    setFees([]);
  }
};

  useEffect(() => {
    loadFees();
  }, []);

  const handleAddFee = () => {
    setSelectedFee(null);
    setShowFeeForm(true);
  };

  const handleEditFee = (fee) => {
    setSelectedFee(fee);
    setShowFeeForm(true);
  };

  const handleDeleteFee = async (id) => {
    if (window.confirm("Are you sure you want to delete this fee record?")) {
      await deleteFee(id);
      loadFees();
    }
  };

  const handleSubmitFee = async (fee) => {
    try {
      if (fee._id) {
        await updateFee(fee._id, fee);
      } else {
        await createFee(fee);
      }
      setShowFeeForm(false);
      setSelectedFee(null);
      loadFees();
    } catch (error) {
      console.error("Error saving fee:", error);
    }
  };

  const handleCancelFee = () => {
    setShowFeeForm(false);
    setSelectedFee(null);
  };

  return (
    <div className="fees-container">
      <h2>Fee Management</h2>
      {!showFeeForm && (
        <button className="add-fee-btn" onClick={handleAddFee}>
          Add Fee
        </button>
      )}
      {showFeeForm ? (
        <FeeForm
          selectedFee={selectedFee}
          onSubmit={handleSubmitFee}
          onCancel={handleCancelFee}
        />
      ) : (
        <FeeTable
          fees={fees}
          onEdit={handleEditFee}
          onDelete={handleDeleteFee}
        />
      )}
    </div>
  );
};

export default FeesPage;
