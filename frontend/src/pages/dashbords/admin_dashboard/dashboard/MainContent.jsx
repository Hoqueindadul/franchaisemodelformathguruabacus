import React, { useState, useEffect, lazy, Suspense } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../common/Sidebar";
import { SiCoursera } from "react-icons/si";
import { FaUsers, FaChartLine, FaShoppingCart } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from "../common/Invoice";
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
                const response = await axios.get(`${BACKEND_URL}/api/admission/getAllAdmitedStudents`);
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
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: '',
        purpose: ''
    });
    const [isGenerated, setIsGenerated] = useState(false);
    const [paidStudents, setPaidStudents] = useState([]);

    const [errors, setErrors] = useState({});
    const [transaction, setTransaction] = useState(null);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Invalid amount';
        if (!formData.purpose) newErrors.purpose = 'Select purpose';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newTransaction = {
                ...formData,
                id: uuidv4(),
                date: new Date().toISOString(),
                amount: parseFloat(formData.amount)
            };
            setTransaction(newTransaction);
            setIsDownloaded(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        let errorMessage = "";
        if (name === "name" && !value.trim()) errorMessage = "Name is required";
        if (name === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) errorMessage = "Invalid email";
        if (name === "amount" && (isNaN(value) || value <= 0)) errorMessage = "Invalid amount";
        if (name === "purpose" && !value) errorMessage = "Select a purpose";

        setErrors(prev => ({ ...prev, [name]: errorMessage }));
    };

    const handlePay = (student) => {
        setSelectedStudent(student);
        console.log(student)
        setFormData({
            name: student.studentName || '',
            email: student.email || '',
            amount: '',
            purpose: ''
        });
        setErrors({});
        setTransaction(null);
        setIsDownloaded(false);
        setIsGenerated(false);
    };
    const resetForm = () => {
        setSelectedStudent(null);
        setFormData({
            name: '',
            email: '',
            amount: '',
            purpose: ''
        });
        setErrors({});
        setTransaction(null);
        setIsGenerated(false);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setFormData({
            name: '',
            email: '',
            amount: '',
            purpose: ''
        });
        setErrors({});
        setTransaction(null);
        setIsDownloaded(false);
        setIsGenerated(false);
    };

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
                                        <TopperList handlePay={handlePay} />
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

            {selectedStudent && (
                <div className="modal d-flex align-items-center justify-content-center">
                    <div
                        className="modal-content p-3"
                        style={{
                            width: '450px', // Smaller modal width
                            maxWidth: '95%', // Responsive for smaller screens
                            height: 'auto', // Adjusts automatically based on content
                            maxHeight: '90vh', // Prevents overflow on small screens
                            overflowY: 'auto', // Enables scrolling if content is too tall
                            borderRadius: '12px',
                        }}
                    >
                        <span
                            className="close"
                            onClick={closeModal}
                            style={{ fontSize: '24px', cursor: 'pointer', position: 'absolute', top: '10px', right: '15px' }}
                        >
                            &times;
                        </span>

                        <h2 className="text-center mb-3 mt-4">
                            Payment for {selectedStudent.studentName}
                        </h2>

                        <div className="feesFormCard p-2">
                            <form onSubmit={handleSubmit} className="text-start">
                                <div className="mb-2">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                        value={formData.amount}
                                        onChange={handleChange}
                                    />
                                    {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Purpose</label>
                                    <select
                                        name="purpose"
                                        className={`form-select ${errors.purpose ? 'is-invalid' : ''}`}
                                        value={formData.purpose}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Purpose</option>
                                        <option value="Admission">Admission Fee</option>
                                        <option value="Monthly">Monthly Fee</option>
                                        <option value="Exam">Exam Fee</option>
                                    </select>
                                    {errors.purpose && <div className="invalid-feedback">{errors.purpose}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mt-2 m-auto"
                                    disabled={!!transaction}
                                >
                                    {isGenerated ? "Generated" : transaction ? "Processing..." : "Generate Receipt"}
                                </button>
                            </form>

                            {transaction && !isDownloaded && (
                                <div className="text-center mt-4">
                                    <PDFDownloadLink
                                        document={<Invoice transaction={transaction} />}
                                        fileName={`receipt_${transaction.id}.pdf`}
                                        className="btn btn-success w-30 m-auto"
                                    >
                                        {({ loading, url, error }) => {
                                            if (loading) return 'Generating PDF...';
                                            if (error) return 'Error generating PDF';
                                            if (!isGenerated) setIsGenerated(true);
                                            return (
                                                <span
                                                    onClick={() => {
                                                        setTimeout(() => {
                                                            //Update the student's payment status
                                                            setStudents(prevStudents =>
                                                                prevStudents.map(student =>
                                                                    student._id === selectedStudent._id
                                                                        ? { ...student, paymentStatus: 'Paid' }
                                                                        : student
                                                                )
                                                            );

                                                            setIsDownloaded(true);
                                                            resetForm();
                                                            closeModal();
                                                        }, 500);
                                                    }}
                                                >
                                                    Download Receipt
                                                </span>

                                            );
                                        }}
                                    </PDFDownloadLink>
                                </div>
                            )}



                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default MainContent;