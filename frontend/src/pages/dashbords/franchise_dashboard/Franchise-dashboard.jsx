import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import './stud_style.css';

import Header_dash from './common/Header_dash';
import MainContent from './dashboard/MainContent';

const Dashboard = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Header and Sidebar are static and visible on the dashboard */}
      <Header_dash />

      {/* Main Dashboard Content */}
      <div className="dashboard-container">
        <div className="main-content">
          <MainContent />
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;

