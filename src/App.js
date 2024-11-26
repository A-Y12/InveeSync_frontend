import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ItemMaster from "./pages/ItemMaster";
import BillOfMaterials from "./pages/BillOfMaterials";
import Processes from "./pages/Processes";
import ProcessSteps from "./pages/ProcessSteps";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/item-master" element={<ItemMaster />} />
        <Route path="/processes" element={<Processes />} />

        <Route path="/bill-of-materials" element={<BillOfMaterials />} />
        <Route path="/process-steps" element={<ProcessSteps />} />
      </Routes>
    </Router>
  );
};

export default App;
