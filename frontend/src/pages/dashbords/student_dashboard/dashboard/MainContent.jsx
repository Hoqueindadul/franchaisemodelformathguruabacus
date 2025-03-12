import React, { useState, useEffect, lazy, Suspense } from "react";
import { Card, Row, Col, Spinner, Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../common/Sidebar";
import { BACKEND_URL } from "../../../../utils";
import { LOCAL_BACKEND_URL } from "../../../../local_backend_url";
import { useAuth } from "../../../../context/AuthProvider";

// Lazy-loaded components
const Mycourses = lazy(() => import("./Mycourses"));

const MainContent = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [payments, setPayments] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);
    const [pendingFees, setPendingFees] = useState(0);
    const [lastPaymentDate, setLastPaymentDate] = useState("");
    const { students } = useAuth();
    // Payment Modal State
    const [showModal, setShowModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [isPaying, setIsPaying] = useState(false);

    useEffect(() => {
        fetchPaymentRecords();
    }, []);

    const fetchPaymentRecords = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/payments`);
            setPayments(data);

            const paidAmount = data.reduce((sum, record) => sum + record.amount, 0);
            setTotalPaid(paidAmount);

            const monthlyFee = 5000;
            const expectedTotal = monthlyFee * data.length;
            setPendingFees(expectedTotal - paidAmount);

            if (data.length > 0) {
                setLastPaymentDate(data[data.length - 1].date);
            }
        } catch (error) {
            console.error("Error fetching payment records:", error);
        }
    };

    const handlePayment = async () => {
        if (paymentAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        setIsPaying(true);
        try {
            await axios.post(`${BACKEND_URL}/api/payments/pay`, {
                amount: paymentAmount,
                date: new Date().toISOString(),
                status: "Paid"
            });

            alert("Payment successful!");
            setShowModal(false);
            fetchPaymentRecords();
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setIsPaying(false);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar setActiveTab={setActiveTab} />

            <div className="main-content flex-grow-1 p-3">
                {activeTab === "dashboard" && (
                    <>
                        <Row className="g-3 mt-3">
                            <Col xs={12}>
                                <Card className="border-0 shadow-sm p-4">
                                    <h1>Welcome, {students?.studentName || "Student"}! 👋</h1>
                                    <p>Your enrolled courses and progress overview.</p>
                                </Card>
                            </Col>

                            <Col xs={12} md={4}>
                                <Card className="border-0 shadow-sm p-3">
                                    <h4>Total Fees Paid</h4>
                                    <h2>₹{totalPaid}</h2>
                                </Card>
                            </Col>

                            <Col xs={12} md={4}>
                                <Card className="border-0 shadow-sm p-3">
                                    <h4>Pending Fees</h4>
                                    <h2 className={pendingFees > 0 ? "text-danger" : "text-success"}>
                                        ₹{pendingFees}
                                    </h2>
                                </Card>
                            </Col>

                            <Col xs={12} md={4}>
                                <Card className="border-0 shadow-sm p-3">
                                    <h4>Last Payment</h4>
                                    <h5>{lastPaymentDate || "No payments yet"}</h5>
                                </Card>
                            </Col>

                            {pendingFees > 0 && (
                                <Col xs={12} className="text-center">
                                    <Button variant="success" onClick={() => setShowModal(true)}>
                                        Pay Now
                                    </Button>
                                </Col>
                            )}

                            <Col xs={12}>
                                <Card className="border-0 shadow-sm p-3">
                                    <h4>💳 Payment History</h4>
                                    {payments.length > 0 ? (
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {payments.map((payment, index) => (
                                                    <tr key={payment.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                                                        <td>₹{payment.amount}</td>
                                                        <td className={payment.status === "Paid" ? "text-success" : "text-danger"}>
                                                            {payment.status}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <p>No payment records found.</p>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}

                {activeTab === "myCourses" && (
                    <Row className="g-3 mt-3">
                        <Col xs={12}>
                            <Card className="border-0 shadow-sm">
                                <Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />}>
                                    <Mycourses />
                                </Suspense>
                            </Card>
                        </Col>
                    </Row>
                )}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Pay Fees</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handlePayment} disabled={isPaying}>
                        {isPaying ? "Processing..." : "Pay Now"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MainContent;
