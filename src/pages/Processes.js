import React, { useState } from "react";
import Select from "react-select"; // For searchable dropdowns
import { NavLink } from "react-router-dom";
import "../styles/Processes.css";

const Processes = () => {
  const [processData, setProcessData] = useState([]);
  const [formData, setFormData] = useState({
    process_name: null,
    tenant_id: null,
    factory_id: null,
    enable_advanced: false,
  });
  const [errors, setErrors] = useState({});
  const [advancedSettingsAllowed, setAdvancedSettingsAllowed] = useState(false); // Conditional toggle

  // Dropdown options (could be fetched from an API in a real-world app)
  const processOptions = [
    { value: "Process A", label: "Process A" },
    { value: "Process B", label: "Process B" },
  ];
  const tenantOptions = [
    { value: 1, label: "Tenant 1" },
    { value: 2, label: "Tenant 2" },
  ];
  const factoryOptions = [
    { value: 101, label: "Factory 101" },
    { value: 102, label: "Factory 102" },
  ];

  // Handle changes in form inputs
  const handleInputChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : null,
    }));
  };

  // Toggle advanced settings based on tenant configuration
  const handleToggleChange = (e) => {
    const isEnabled = e.target.checked;
    if (advancedSettingsAllowed || !isEnabled) {
      setFormData((prev) => ({ ...prev, enable_advanced: isEnabled }));
    }
  };

  // Validation logic
  const validate = () => {
    let validationErrors = {};

    // Mandatory fields check
    if (!formData.process_name) validationErrors.process_name = "Process Name is required.";
    if (!formData.tenant_id) validationErrors.tenant_id = "Tenant is required.";
    if (!formData.factory_id) validationErrors.factory_id = "Factory is required.";

    // Highlight rows with errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // API call to validate unique combinations
    // Mock API validation for process_name + tenant uniqueness
    const isUnique = !processData.some(
      (data) => data.process_name === formData.process_name && data.tenant_id === formData.tenant_id
    );

    if (!isUnique) {
      setErrors({ unique: "Process Name + Tenant combination must be unique." });
      return;
    }

    setProcessData((prev) => [...prev, formData]);
    setFormData({
      process_name: null,
      tenant_id: null,
      factory_id: null,
      enable_advanced: false,
    });
  };

  // Reset a specific row
  const resetRow = () => {
    setFormData({
      process_name: null,
      tenant_id: null,
      factory_id: null,
      enable_advanced: false,
    });
    setErrors({});
  };

  return (
    <div className="processes-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Navigation</h3>
        <ul>
          
          <li>
            <NavLink to="/item-master" className={({ isActive }) => (isActive ? "active" : "")}>
              2. Item Master
            </NavLink>
          </li>
          <li>
            <NavLink to="/processes" className={({ isActive }) => (isActive ? "active" : "")}>
              3. Processes
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
            <NavLink to="/process-steps" className={({ isActive }) => (isActive ? "active" : "")}>
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
        <h2>Processes</h2>
        <form onSubmit={handleSubmit} className="process-form">
          <div className="form-group">
            <label>Process Name *</label>
            <Select
              options={processOptions}
              onChange={(option) => handleInputChange("process_name", option)}
              placeholder="Select Process"
            />
            {errors.process_name && <p className="error">{errors.process_name}</p>}
          </div>

          <div className="form-group">
            <label>Tenant *</label>
            <Select
              options={tenantOptions}
              onChange={(option) => handleInputChange("tenant_id", option)}
              placeholder="Select Tenant"
            />
            {errors.tenant_id && <p className="error">{errors.tenant_id}</p>}
          </div>

          <div className="form-group">
            <label>Factory *</label>
            <Select
              options={factoryOptions}
              onChange={(option) => handleInputChange("factory_id", option)}
              placeholder="Select Factory"
            />
            {errors.factory_id && <p className="error">{errors.factory_id}</p>}
          </div>

          <div className="form-group">
            <label>
              Enable Advanced Settings
              <input
                type="checkbox"
                checked={formData.enable_advanced}
                onChange={handleToggleChange}
                disabled={!advancedSettingsAllowed}
              />
            </label>
          </div>

          {errors.unique && <p className="error">{errors.unique}</p>}

          <button type="submit">Add Process</button>
          <button type="button" onClick={resetRow} className="reset-button">
            Reset
          </button>
        </form>

        <div className="process-list">
          <h3>Processes List</h3>
          {processData.length === 0 ? (
            <p>No processes added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Process Name</th>
                  <th>Tenant</th>
                  <th>Factory</th>
                  <th>Advanced Settings</th>
                </tr>
              </thead>
              <tbody>
                {processData.map((process, index) => (
                  <tr key={index} className={errors[process.process_name] ? "error-row" : ""}>
                    <td>{process.process_name}</td>
                    <td>{process.tenant_id}</td>
                    <td>{process.factory_id}</td>
                    <td>{process.enable_advanced ? "Enabled" : "Disabled"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Processes;
