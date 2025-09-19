import React, { useState, useEffect } from "react";

const FeeForm = ({ selectedFee, onSubmit, onCancel }) => {
  const [fee, setFee] = useState({
    className: "",
    section: "",
    medium: "",
    tuitionFee: "",
    labFee: "",
    sportsFee: "",
  });

  useEffect(() => {
    if (selectedFee) setFee(selectedFee);
  }, [selectedFee]);

  const handleChange = (e) => {
    setFee({ ...fee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(fee);
  };

  return (
    <form onSubmit={handleSubmit} className="fee-form">
      <input name="className" value={fee.className} onChange={handleChange} placeholder="Class Name" required />
      <input name="section" value={fee.section} onChange={handleChange} placeholder="Section" required />
      <input name="medium" value={fee.medium} onChange={handleChange} placeholder="Medium" required />
      <input name="tuitionFee" value={fee.tuitionFee} onChange={handleChange} placeholder="Tuition Fee" required />
      <input name="labFee" value={fee.labFee} onChange={handleChange} placeholder="Lab Fee" required />
      <input name="sportsFee" value={fee.sportsFee} onChange={handleChange} placeholder="Sports Fee" required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default FeeForm;
