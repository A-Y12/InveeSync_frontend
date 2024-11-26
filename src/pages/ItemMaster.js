import React, { useState } from "react";
import Select from "react-select";
import "../styles/ItemMaster.css";
import { NavLink } from "react-router-dom";

const ItemMaster = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    internal_item_name: "",
    type: "",
    uom: "",
    avg_weight_needed: "",
    is_job_work: false,
  });
  const [errors, setErrors] = useState({});

  // Dropdown options for type
  const typeOptions = [
    { value: "sell", label: "Sell" },
    { value: "purchase", label: "Purchase" },
    { value: "component", label: "Component" },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, type: selectedOption.value }));
  };

  // Validation logic
  const validate = () => {
    let validationErrors = {};
    if (!formData.internal_item_name) validationErrors.internal_item_name = "Internal item name is required.";
    if (!formData.type) validationErrors.type = "Type is required.";
    if (!formData.uom) validationErrors.uom = "UoM is required.";
    if (!formData.avg_weight_needed) validationErrors.avg_weight_needed = "Average weight is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setItems((prev) => [...prev, formData]);
      setFormData({
        internal_item_name: "",
        type: "",
        uom: "",
        avg_weight_needed: "",
        is_job_work: false,
      });
      setErrors({});
    }
  };

  return (
    <div className="item-master-container">
      {/* Sidebar for Navigation and Quick Actions */}
      <div className="sidebar">
        <h3>Navigation</h3>
        <ul>
          <li>
            <NavLink
              to="/item-master"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              1. Items Master
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/processes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              2. Processes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bill-of-materials"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              3. Bill of Materials
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/process-steps"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              4. Process Steps
            </NavLink>
          </li>
        </ul>
        <div className="quick-actions">
          <h4>Quick Actions</h4>
          <button>Upload Bulk Data</button>
          <button>Download Templates</button>
          <button>View Audit Log</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Item Master</h2>
        <form className="item-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Internal Item Name *</label>
            <input
              type="text"
              name="internal_item_name"
              value={formData.internal_item_name}
              onChange={handleChange}
              placeholder="Enter item name"
            />
            {errors.internal_item_name && <p className="error">{errors.internal_item_name}</p>}
          </div>

          <div className="form-group">
            <label>Type *</label>
            <Select
              options={typeOptions}
              onChange={handleSelectChange}
              placeholder="Select type"
            />
            {errors.type && <p className="error">{errors.type}</p>}
          </div>

          <div className="form-group">
            <label>UoM *</label>
            <input
              type="text"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              placeholder="Enter UoM"
            />
            {errors.uom && <p className="error">{errors.uom}</p>}
          </div>

          <div className="form-group">
            <label>Average Weight Needed *</label>
            <input
              type="number"
              name="avg_weight_needed"
              value={formData.avg_weight_needed}
              onChange={handleChange}
              placeholder="Enter average weight"
            />
            {errors.avg_weight_needed && <p className="error">{errors.avg_weight_needed}</p>}
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="is_job_work"
                checked={formData.is_job_work}
                onChange={handleChange}
              />
              Is Job Work
            </label>
          </div>

          <button type="submit">Add Item</button>
        </form>

        <div className="item-list">
          <h3>Items List</h3>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Type</th>
                <th>UoM</th>
                <th>Average Weight</th>
                <th>Is Job Work</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.internal_item_name}</td>
                  <td>{item.type}</td>
                  <td>{item.uom}</td>
                  <td>{item.avg_weight_needed}</td>
                  <td>{item.is_job_work ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemMaster;
