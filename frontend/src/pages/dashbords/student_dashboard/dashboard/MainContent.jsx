import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../common/Sidebar";
import { SiCoursera } from "react-icons/si";
import { FaUsers, FaChartLine, FaShoppingCart } from "react-icons/fa";
import TopperList from "./ToppersList";
import AddCourse from "./courseSubTab/AddCourse";
import AllCourse from "./courseSubTab/AllCourse";
import AllStudents from "./studentSubTab/AllStudents";
import AddStuff from "./staffSubTab/AddStaff";
import AllStaff from "./staffSubTab/AllStaff";
import DeleteStuff from "./staffSubTab/DeleteStaff";

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // State to track the active tab
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/all-users");
        
        setTotalStudents(response.data); // Update with the correct data structure from your API response
      } catch (error) {
        console.error("Error fetching total students count:", error);
      }
    };

    fetchTotalStudents(); // Call the function to fetch the data
  }, []);

  useEffect(() => {
    const fetchTotalCourse = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/courses/allCourse");
        
        setTotalCourses(response.data.totalCourses); // Update with the correct data structure from your API response
      } catch (error) {
        console.error("Error fetching total courses count:", error);
      }
    };

    fetchTotalCourse(); // Call the function to fetch the data
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} /> {/* Pass setActiveTab to Sidebar */}

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-3">
        {activeTab === "dashboard" && (
          <>
            {/* Dashboard Cards */}
            <Row className="g-3">
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted">Total Students</h6>
                        <h3>{totalStudents.length}</h3> {/* Display totalStudents */}
                      </div>
                      <FaUsers className="text-primary" size={24} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted">Revenue</h6>
                        <h3>₹5,678</h3>
                      </div>
                      <FaChartLine className="text-success" size={24} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted">Orders</h6>
                        <h3>567</h3>
                      </div>
                      <FaShoppingCart className="text-warning" size={24} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted">Courses</h6>
                        <h3>{totalCourses}</h3> {/* Display totalCourses */}
                      </div>
                      <SiCoursera className="text-info" size={24} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Recent Activity and Toppers List */}
            <Row className="g-3 mt-3">
              <Col xs={12}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-4">Recent Activity</h5>
                    <div className="activity-item d-flex align-items-center mb-3">
                      <div className="bg-light rounded-circle p-3 me-3">
                        <FaUsers className="text-primary" />
                      </div>
                      <div>
                        <h6 className="mb-1">New user registered</h6>
                        <small className="text-muted">5 minutes ago</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12}>
                <Card className="border-0 shadow-sm">
                  <TopperList />
                </Card>
              </Col>
            </Row>
          </>
        )}

        {/* Course Tabs */}
        {activeTab === "addcourse" && <AddCourse />}
        {activeTab === "allcourse" && <AllCourse />}

        {/* Student Tabs */}
        {activeTab === "allstudents" && <AllStudents />}

        {/* Stuff Tabs */}
        {activeTab === "addstaff" && <AddStuff />}
        {activeTab === "allstaff" && <AllStaff />}
      </div>
    </div>
  );
};

export default MainContent;
