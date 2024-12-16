import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import { FaUsers, FaChartLine, FaShoppingCart, FaComments } from 'react-icons/fa';

const MainContent = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col lg={3} md={6} className="mb-4">
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
        <Col lg={3} md={6} className="mb-4">
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
        <Col lg={3} md={6} className="mb-4">
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
        <Col lg={3} md={6} className="mb-4">
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
        <Col lg={8} className="mb-4">
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
              <div className="activity-item d-flex align-items-center mb-3">
                <div className="bg-light rounded-circle p-3 me-3">
                  <FaShoppingCart className="text-warning" />
                </div>
                <div>
                  <h6 className="mb-1">New order received</h6>
                  <small className="text-muted">15 minutes ago</small>
                </div>
              </div>
              <div className="activity-item d-flex align-items-center">
                <div className="bg-light rounded-circle p-3 me-3">
                  <FaComments className="text-info" />
                </div>
                <div>
                  <h6 className="mb-1">New comment on post</h6>
                  <small className="text-muted">30 minutes ago</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Quick Stats</h5>
              <div className="mb-3">
                <h6 className="text-muted mb-2">Daily Visitors</h6>
                <div className="progress">
                  <div className="progress-bar w-75" role="progressbar"></div>
                </div>
              </div>
              <div className="mb-3">
                <h6 className="text-muted mb-2">Sales</h6>
                <div className="progress">
                  <div className="progress-bar bg-success w-65" role="progressbar"></div>
                </div>
              </div>
              <div>
                <h6 className="text-muted mb-2">Conversion</h6>
                <div className="progress">
                  <div className="progress-bar bg-warning w-50" role="progressbar"></div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default MainContent