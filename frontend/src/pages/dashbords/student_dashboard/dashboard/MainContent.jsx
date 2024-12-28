import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaChartLine,
  FaShoppingCart,
  FaComments,
} from "react-icons/fa";
import TopperList from "./ToppersList";
import Sidebar from "../common/Sidebar";

const MainContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`main-content p-3`}
        style={{
          marginLeft: isSidebarOpen && window.innerWidth > 768 ? "0px" : "2px", // Added 10px gap
          width: isSidebarOpen && window.innerWidth > 768 ? "calc(100% - 20px)" : "100%",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Row>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">Users</h6>
                    <h3>1,234</h3>
                  </div>
                  <FaUsers className="text-primary" size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">Revenue</h6>
                    <h3>$5,678</h3>
                  </div>
                  <FaChartLine className="text-success" size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
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
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">Comments</h6>
                    <h3>890</h3>
                  </div>
                  <FaComments className="text-info" size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={8} className="mb-4">
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
                {/* Add more activity items here */}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="mb-4">Quick Stats</h5>
                <div className="mb-3">
                  <h6 className="text-muted mb-2">Daily Visitors</h6>
                  <div className="progress">
                    <div className="progress-bar w-75" role="progressbar"></div>
                  </div>
                </div>
                {/* Add more stats here */}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={12}>
            <Card className="border-0 shadow-sm">
              <TopperList />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainContent;
