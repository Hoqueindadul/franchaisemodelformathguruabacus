import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './stud_style.css'

import Header_dash from './common/Header_dash';
import Sidebar from './common/Sidebar';
import CourseTable from './dashboard/CourseTable';
import MainContent from './dashboard/MainContent';
import StatsCard from './dashboard/StatsCard';
import ToppersList from './dashboard/ToppersList';

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Header and Sidebar are typically not route-specific */}
      <Header_dash />
      <Sidebar />

      {/* Main content */}
      <div className="dashboard-container">
        <Routes>
          {/* Define your routes here */}
          <Route path="courses" element={<CourseTable />} />
          <Route path="main" element={<MainContent />} />
          <Route path="toppers" element={<ToppersList />} />
          <Route path="stats" element={<StatsCard />} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
