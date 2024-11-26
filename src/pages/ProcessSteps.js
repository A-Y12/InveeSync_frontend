import React, { useState } from "react";
import "../styles/ProcessSteps.css";
import { NavLink } from "react-router-dom";


const ProcessSteps = () => {
  const [steps, setSteps] = useState([
    { id: 1, item_id: "Raw Material Receipt", process_id: "Internal Transfer", sequence: 1, conversion_ratio: 50, description: "Transfer of raw materials" },
    { id: 2, item_id: "Manufacturing", process_id: "Assembly", sequence: 2, conversion_ratio: 80, description: "Manufacturing process" },
  ]);

  const [newStep, setNewStep] = useState({ item_id: "", process_id: "", sequence: "", conversion_ratio: "", description: "" });
  const [errors, setErrors] = useState([]);

  const validateStep = (step) => {
    const errorList = [];

    // Validation rules
    if (!step.item_id || !step.process_id || !step.sequence || !step.conversion_ratio || !step.description) {
      errorList.push("All fields are mandatory.");
    }
    if (steps.some((s) => s.item_id === step.item_id && s.sequence === parseInt(step.sequence))) {
      errorList.push(`Duplicate item_id and sequence: ${step.item_id}, sequence ${step.sequence}.`);
    }
    const sequenceNumbers = steps.map((s) => s.sequence);
    sequenceNumbers.push(parseInt(step.sequence));
    sequenceNumbers.sort((a, b) => a - b);
    for (let i = 1; i <= sequenceNumbers.length; i++) {
      if (!sequenceNumbers.includes(i)) {
        errorList.push("Sequence gap detected.");
        break;
      }
    }
    if (step.process_id === "Internal Transfer" && steps.some((s) => s.process_id === "Internal Transfer")) {
      errorList.push("Only one 'Internal Transfer' step allowed.");
    }
    if (step.conversion_ratio < 0 || step.conversion_ratio > 100) {
      errorList.push("Conversion ratio must be between 0 and 100.");
    }
    if (step.conversion_ratio < 30) {
      errorList.push(`Low conversion ratio warning: ${step.conversion_ratio}.`);
    }

    return errorList;
  };

  const handleAddStep = () => {
    const errors = validateStep(newStep);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    setSteps([...steps, { ...newStep, id: steps.length + 1 }]);
    setNewStep({ item_id: "", process_id: "", sequence: "", conversion_ratio: "", description: "" });
    setErrors([]);
  };

  const handleInputChange = (field, value) => {
    setNewStep({ ...newStep, [field]: value });
  };

  return (
    <div className="process-steps-page">
      <aside className="sidebar">
      <div className="navigation">
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
    </div>
  
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button>Upload Bulk Data</button>
          <button>Download Templates</button>
          <button>View Audit Log</button>
        </div>
      </aside>

      <main className="dashboard">
        <header className="dashboard-header">
          <h1>Process Steps Configuration</h1>
          <p>Define manufacturing sequence and parameters</p>
        </header>

        <div className="process-steps-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Select Item"
            value={newStep.item_id}
            onChange={(e) => handleInputChange("item_id", e.target.value)}
          />
          <div className="process-steps-list">
            {steps.map((step) => (
              <div key={step.id} className="process-step">
                <p>
                  <strong>{step.sequence}. {step.item_id}</strong>
                  <br />
                  Process: {step.process_id}
                </p>
              </div>
            ))}

            <div className="add-step">
              <input
                type="number"
                placeholder="Sequence"
                value={newStep.sequence}
                onChange={(e) => handleInputChange("sequence", e.target.value)}
              />
              <input
                type="text"
                placeholder="Process Description"
                value={newStep.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              <input
                type="number"
                placeholder="Conversion Ratio"
                value={newStep.conversion_ratio}
                onChange={(e) => handleInputChange("conversion_ratio", e.target.value)}
              />
              <button onClick={handleAddStep}>+ Add Process Step</button>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="errors">
              <h4>Errors</h4>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProcessSteps;
