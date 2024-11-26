import React from "react";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Setup Progress</h3>
        <ul>
          <li className="complete">Tenant Configuration ✔</li>
          <li className="active">
        
            <Link to="/item-master" className="sidebar-link">
              <span className="status-circle completed"></span> Items Master ➡
            </Link>
          </li>
          <li>
            
            <Link to="/processes" className="sidebar-link">
              <span className="status-circle active"></span> Processes
            </Link>
          </li>
          <li>
            <Link to="/bill-of-materials" className="sidebar-link">
              <span className="status-circle incomplete"></span> Bill of Materials
            </Link>
          </li>
          <li>
          <Link to="/process-steps" className="sidebar-link">
              <span className="status-circle incomplete"></span> Process Steps
            </Link>
          </li>
        </ul>
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button>Upload Bulk Data</button>
          <button>Download Templates</button>
          <button>View Audit Log</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard">
        <header className="dashboard-header">
          <h1>Data Onboarding</h1>
        </header>
        <div className="dashboard-summary">
          <div className="card">
            <h3>Processes</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>BoMs</h3>
            <p>
              <span>28</span>/35
            </p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>

        <div className="tab-section">
          <div className="tabs">
            <button className="active">Items Master</button>
            <button>Processes</button>
            <button>BoM</button>
            <button>Steps</button>
          </div>
          <div className="tab-content">
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Type</th>
                  <th>UoM</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Steel Pipe Grade A</td>
                  <td>Component</td>
                  <td>KG</td>
                  <td className="pending">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Pending Setup */}
      <aside className="pending-setup">
        <h3>Pending Setup</h3>
        <div className="pending-item">
          <p>Steel Pipe Grade A</p>
          <span>Missing UoM</span>
          <button>Resolve Now →</button>
        </div>
        <div className="pending-item">
          <p>Assembly X23</p>
          <span>Incomplete components</span>
          <button>Resolve Now →</button>
        </div>
      </aside>
    </div>
  );
};

export default LandingPage;
