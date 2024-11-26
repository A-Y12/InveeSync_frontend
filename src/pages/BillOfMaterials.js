import React, { useState } from "react";
import Select from "react-select";
import "../styles/BillOfMaterials.css";
import { NavLink } from "react-router-dom";

// Error Message Component
const ErrorMessage = ({ error }) => {
  return <span className="error-text">{error}</span>;
};

// Row Component
const Row = ({ index, row, handleInputChange, handleRemoveRow, errors, itemsOptions, componentOptions, uomOptions }) => {
  return (
    <tr className={errors ? "error-row" : ""} key={row.id}>
      <td>
        <Select
          options={itemsOptions}
          value={itemsOptions.find((opt) => opt.value === row.item_id)}
          onChange={(selected) => handleInputChange(index, "item_id", selected?.value)}
          placeholder="Select Item"
          isSearchable
        />
        {errors?.item_id && <ErrorMessage error={errors.item_id} />}
      </td>
      <td>
        <Select
          options={componentOptions}
          value={componentOptions.find((opt) => opt.value === row.component_id)}
          onChange={(selected) => handleInputChange(index, "component_id", selected?.value)}
          placeholder="Select Component"
          isSearchable
        />
        {errors?.component_id && <ErrorMessage error={errors.component_id} />}
      </td>
      <td>
        <input
          type="number"
          value={row.quantity}
          onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
          placeholder="Enter Quantity"
        />
        {errors?.quantity && <ErrorMessage error={errors.quantity} />}
      </td>
      <td>
        <Select
          options={uomOptions}
          value={uomOptions.find((opt) => opt.value === row.uom)}
          onChange={(selected) => handleInputChange(index, "uom", selected?.value)}
          placeholder="Select UOM"
        />
      </td>
      <td>
        <button type="button" className="remove-button" onClick={() => handleRemoveRow(index)}>
          Remove
        </button>
      </td>
    </tr>
  );
};

const BillOfMaterials = () => {
  const [rows, setRows] = useState([
    { id: 1, item_id: "", component_id: "", quantity: "", uom: "" },
  ]);
  const [errors, setErrors] = useState({});
  
  const uomOptions = [
    { value: "Nos", label: "Nos" },
    { value: "Kgs", label: "Kgs" },
    { value: "Mixed Nos/Kgs", label: "Mixed Nos/Kgs" },
  ];

  const itemsOptions = [
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
  ];

  const componentOptions = [
    { value: "component1", label: "Component 1" },
    { value: "component2", label: "Component 2" },
  ];

  // Validate row based on rules
  const validateRow = (row) => {
    const rowErrors = {};

    // Check for mandatory fields
    if (!row.item_id) rowErrors.item_id = "Item ID is required";
    if (!row.component_id) rowErrors.component_id = "Component ID is required";
    if (!row.quantity) rowErrors.quantity = "Quantity is required";

    // UOM-based validation
    if (row.uom === "Nos" && !Number.isInteger(Number(row.quantity))) {
      rowErrors.quantity = "Quantity must be an integer for Nos";
    } else if (row.uom === "Mixed Nos/Kgs" && row.quantity <= 0) {
      rowErrors.quantity = "Quantity must be positive for Mixed Nos/Kgs";
    }

    return rowErrors;
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    const rowErrors = validateRow(updatedRows[index]);
    const updatedErrors = { ...errors, [index]: rowErrors };

    setRows(updatedRows);
    setErrors(updatedErrors);
  };

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, item_id: "", component_id: "", quantity: "", uom: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    const updatedErrors = { ...errors };
    delete updatedErrors[index];

    setRows(updatedRows);
    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let allErrors = {};
    rows.forEach((row, index) => {
      const rowErrors = validateRow(row);
      if (Object.keys(rowErrors).length > 0) {
        allErrors[index] = rowErrors;
      }
    });

    setErrors(allErrors);
  };

  return (
    <div className="bill-of-materials-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Navigation</h3>
        <ul>
          <li>
            <NavLink to="/item-master" activeClassName="active">1. Items Master</NavLink>
          </li>
          <li>
            <NavLink to="/processes" activeClassName="active">2. Processes</NavLink>
          </li>
          <li>
            <NavLink to="/bill-of-materials" activeClassName="active">3. Bill of Materials</NavLink>
          </li>
          <li>
            <NavLink to="/process-steps" activeClassName="active">4. Process Steps</NavLink>
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
        <h2>Bill of Materials Builder</h2>
        <form onSubmit={handleSubmit} className="bom-form">
          <table className="components-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Component ID</th>
                <th>Quantity</th>
                <th>UOM</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Row
                  key={row.id}
                  index={index}
                  row={row}
                  handleInputChange={handleInputChange}
                  handleRemoveRow={handleRemoveRow}
                  errors={errors[index]}
                  itemsOptions={itemsOptions}
                  componentOptions={componentOptions}
                  uomOptions={uomOptions}
                />
              ))}
            </tbody>
          </table>
          <button type="button" className="add-component-button" onClick={handleAddRow}>
            + Add Component
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillOfMaterials;
