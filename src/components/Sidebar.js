import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            1. Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/item-master"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            2. Item Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/processes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            3. Processes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bill-of-materials"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            4. Bill of Materials
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/process-steps"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            5. Process Steps
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
  );
};

export default Sidebar;
