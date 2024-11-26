import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/dashboard/items-master">Items Master</Link>
      <Link to="/dashboard/bill-of-materials">BoM</Link>
      <Link to="/dashboard/processes">Processes</Link>
      <Link to="/dashboard/process-steps">Process Steps</Link>
    </nav>
  );
};

export default Navigation;
