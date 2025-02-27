import React, { useState, useEffect, lazy, Suspense } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../common/Sidebar";
import { SiCoursera } from "react-icons/si";
import { FaUsers, FaChartLine, FaShoppingCart } from "react-icons/fa";
import { BACKEND_URL } from "../../../../utils";
import { LOCAL_BACKEND_URL } from "../../../../local_backend_url";

// Lazy-loaded components
const TopperList = lazy(() => import("./ToppersList"));
const AddCourse = lazy(() => import("./courseSubTab/AddCourse"));
const AllCourse = lazy(() => import("./courseSubTab/AllCourse"));
const AllStudents = lazy(() => import("./studentSubTab/AllStudents"));
const StudentAdmission = lazy(() => import("./studentSubTab/StudentAdmission"));
const EnrolledStudents = lazy(() => import("./EnrolledStudents"));
const AddStaff = lazy(() => import("./staffSubTab/AddStaff"));
const AllStaff = lazy(() => import("./staffSubTab/AllStaff"));
const AddBranch = lazy(() => import("./branch/AddBranch"));
const AllBranches = lazy(() => import("./branch/AllBranches"));

// Lazy-loaded student count
const TotalStudents = () => {
  const [totalStudents, setTotalStudents] = useState(null);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await axios.get(`${LOCAL_BACKEND_URL}/api/admission/getAllAdmitedStudents`);
        setTotalStudents(response.data.length);
      } catch (error) {
        console.error("Error fetching total students count:", error);
      }
    };
    fetchTotalStudents();
  }, []);

  return totalStudents !== null ? <h3>{totalStudents}</h3> : <Spinner animation="border" variant="primary" />;
};

// Lazy-loaded course count
const TotalCourses = () => {
  const [totalCourses, setTotalCourses] = useState(null);

  useEffect(() => {
    const fetchTotalCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/courses/allCourse`);
        setTotalCourses(response.data.totalCourses);
      } catch (error) {
        console.error("Error fetching total courses count:", error);
      }
    };
    fetchTotalCourses();
  }, []);

  return totalCourses !== null ? <h3>{totalCourses}</h3> : <Spinner animation="border" variant="primary" />;
};

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="d-flex">
      <Sidebar setActiveTab={setActiveTab} />

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
                        <TotalStudents />
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
                        <TotalCourses />
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
                  <Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />}>
                    <TopperList />
                  </Suspense>
                </Card>
              </Col>
            </Row>
          </>
        )}

        {/* Lazy Loaded Tabs */}
        <Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />}>
          {activeTab === "addcourse" && <AddCourse />}
          {activeTab === "allcourse" && <AllCourse />}
          {activeTab === "studentAdmission" && <StudentAdmission />}
          {activeTab === "allstudents" && <AllStudents />}
          {activeTab === "enrolledStudent" && <EnrolledStudents />}
          {activeTab === "addstaff" && <AddStaff />}
          {activeTab === "allstaff" && <AllStaff />}
          {activeTab === "addbranch" && <AddBranch />}
          {activeTab === "allbranches" && <AllBranches />}
        </Suspense>
      </div>
    </div>
  );
};

export default MainContent;
