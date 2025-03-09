import React, { useState, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectRoute";
import { useAuth } from "./context/AuthProvider";

// Static Components (Load Immediately)
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

// Lazy-loaded Pages
const About = lazy(() => import("./pages/About"));
const Whatwedo = lazy(() => import("./pages/Whatwedo"));

// Courses
const CourseAbacus = lazy(() => import("./pages/Courses/Course_abacus"));
const CourseKidsEnglish = lazy(() => import("./pages/Courses/Course_kidsEnglish"));
const CourseHandwriting = lazy(() => import("./pages/Courses/Course_handwritting"));
const CourseVedicMath = lazy(() => import("./pages/Courses/Course_vedicMath"));

// Franchise
const Benifit = lazy(() => import("./pages/Franchise/Benifit"));
const Criteria = lazy(() => import("./pages/Franchise/Criteria"));
const FranchiseRegistraion = lazy(() => import("./pages/Franchise/FranchiseRegistraion"));
const FranchiseLogin = lazy(() => import("./pages/Franchise/FranchiseLogin"));

// Trainers
const BecomeTrainer = lazy(() => import("./pages/Trainer/BecomeTrainer"));
const Trainers = lazy(() => import("./pages/Trainer/Trainers"));

// Other Pages
const StudyCenter = lazy(() => import("./pages/Study_Center"));
const SchoolTieup = lazy(() => import("./pages/School_tieup"));
const BuyMaterials = lazy(() => import("./pages/Buy_materials"));
const Contact = lazy(() => import("./pages/Contact"));

// Authentication
const Login = lazy(() => import("./pages/Authentications/Login"));
const Register = lazy(() => import("./pages/Authentications/Register"));

// Payment
const FeeForm = lazy(() => import("./pages/feesCollection/FeeForm"));
const PaymentPage = lazy(() => import("./pages/payments/PaymentPage"));

// Dashboard
const AdminDashboard = lazy(() => import("./pages/dashbords/admin_dashboard/Admin-dashboard"));
const StudentDashboard = lazy(() => import("./pages/dashbords/student_dashboard/Student-dashboard"));
const FranchiseDashboard = lazy(() => import("./pages/dashbords/franchise_dashboard/Franchise-dashboard"));

function App() {
  const location = useLocation();
  const { isAuthenticated, userRole } = useAuth();

  const hideNavbarFooter = [
    "/dashboard",
    "/student-dashboard",
    "/franchise-dashboard",
    "/register",
    "/login",
    "/franchise-registraion",
    "/franchise-login",
  ].includes(location.pathname);

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div>
      {!hideNavbarFooter && <NavBar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/whatwedo" element={<Whatwedo />} />
          <Route path="/becomeatrainer" element={<BecomeTrainer />} />

          {/* Franchise Routes */}
          <Route path="/benifit" element={<Benifit />} />
          <Route path="/criteria" element={<Criteria />} />
          <Route path="/franchise-registraion" element={<FranchiseRegistraion />} />
          <Route path="/franchise-login" element={<FranchiseLogin />} />

          {/* Trainers */}
          <Route path="/become-trainer" element={<BecomeTrainer />} />
          <Route path="/trainers" element={<Trainers />} />

          {/* Study Center & School Tieup */}
          <Route path="/studycenter" element={<StudyCenter />} />
          <Route path="/school-tieup" element={<SchoolTieup />} />

          {/* Buy Materials */}
          <Route path="/buymaterials" element={<BuyMaterials addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />

          {/* Courses */}
          <Route path="/vedicmath" element={<CourseVedicMath />} />
          <Route path="/abacus" element={<CourseAbacus />} />
          <Route path="/hand-writing" element={<CourseHandwriting />} />
          <Route path="/kids-english" element={<CourseKidsEnglish />} />

          {/* Payment */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/feesForm" element={<FeeForm />} />

          {/* Authentication */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

          {/* Role-Based Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {userRole === "admin" ? (
                  <AdminDashboard />
                ) : userRole === "franchise" ? (
                  <Navigate to="/franchise-dashboard" replace />
                ) : userRole === "Student or Parent" ? (
                  <Navigate to="/student-dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                {userRole === "student" ? <StudentDashboard /> : <Navigate to="/dashboard" replace />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/franchise-dashboard"
            element={
              <ProtectedRoute>
                {userRole === "franchise" ? <FranchiseDashboard /> : <Navigate to="/dashboard" replace />}
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
