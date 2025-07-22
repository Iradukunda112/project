import React, { useState } from 'react';
import './AssignedResolution.css';

const AssignedResolution = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    percentage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Resolution:", formData);
    // You can send formData to your backend here
  };

  return (
    <div className="resolution-container">
      <div className="resolution-card">
        <h2 className="resolution-title">Assigned Resolution</h2>
        <form onSubmit={handleSubmit} className="resolution-form">

          <div className="form-group">
            <label htmlFor="title">Resolution Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Improve Tax Collection"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed explanation of the resolution..."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="percentage">Completion Percentage (%)</label>
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              placeholder="e.g. 75"
              min="0"
              max="100"
              required
            />
          </div>

          <div className="form-submit">
            <button type="submit">Submit Resolution</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignedResolution;
