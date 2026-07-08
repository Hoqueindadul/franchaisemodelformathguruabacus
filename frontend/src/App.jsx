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
import NotFound from "./components/NotFound";
import Cart from "./pages/cart/Cart";

// Lazy-loaded Pages
const About = lazy(() => import("./pages/companyDetails/About"));
const Whatwedo = lazy(() => import("./pages/companyDetails/Whatwedo"));
import Hero from "./components/Hero";

// Courses
const Courses = lazy(() => import("./pages/courses/Courses"));
const CourseDetails = lazy(() => import("./pages/courses/CourseDetails"));

// Franchise
const Benifit = lazy(() => import("./pages/Franchise/Benifit"));
const Criteria = lazy(() => import("./pages/Franchise/Criteria"));
const FranchiseRegistraion = lazy(
  () => import("./pages/Franchise/FranchiseRegistraion"),
);
const FranchiseLogin = lazy(() => import("./pages/Franchise/FranchiseLogin"));

// Trainers
const BecomeTrainer = lazy(() => import("./pages/Trainer/BecomeTrainer"));
const Trainers = lazy(() => import("./pages/Trainer/Trainers"));

// Other Pages
const Products = lazy(() => import("./pages/productPages/Products"));
const Contact = lazy(() => import("./pages/companyDetails/Contact"));

// Authentication
const Login = lazy(() => import("./pages/Authentications/Login"));
const Register = lazy(() => import("./pages/Authentications/Register"));

// Product pages

const ProductDetails = lazy(
  () => import("./pages/productPages/ProductDetails"),
);
// Payment
const FeeForm = lazy(() => import("./pages/feesCollection/FeeForm"));
const PaymentPage = lazy(() => import("./pages/payments/PaymentPage"));
const PlaceOrder = lazy(() => import("./pages/order/PlaceOrder"));
const ProductPaymentForm = lazy(
  () => import("./pages/feesCollection/ProductPaymentForm"),
);

// Dashboard
const AdminDashboard = lazy(
  () => import("./pages/dashbords/admin_dashboard/Admin-dashboard"),
);
const StudentDashboard = lazy(
  () => import("./pages/dashbords/student_dashboard/Student-dashboard"),
);
const FranchiseDashboard = lazy(
  () => import("./pages/dashbords/franchise_dashboard/Franchise-dashboard"),
);

function App() {
  const location = useLocation();
  const { isAuthenticated, userRole } = useAuth();

  const hideNavbarFooter = [
    "/dashboard",
    "/student-dashboard",
    "/franchise-dashboard",
    "/admin-dashboard",
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
          <Route path="/hero" element={<Hero />} />
          {/* Franchise Routes */}
          <Route path="/benifit" element={<Benifit />} />
          <Route path="/criteria" element={<Criteria />} />
          <Route
            path="/franchise-registraion"
            element={<FranchiseRegistraion />}
          />
          <Route path="/franchise-login" element={<FranchiseLogin />} />
          {/* Trainers */}
          <Route path="/become-trainer" element={<BecomeTrainer />} />
          <Route path="/trainers" element={<Trainers />} />

          {/* Buy Materials */}
          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          {/* Product */}
          <Route
            path="/productDetails/:productName/:productImage/:price"
            element={<ProductDetails />}
          />
          <Route path="/productDetails" element={<ProductDetails />} />
          {/* Payment */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/feesForm" element={<FeeForm />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/productPaymentForm" element={<ProductPaymentForm />} />
          {/* Authentication */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />
          {/* Role-Based Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {userRole === "admin" ? (
                  <AdminDashboard />
                ) : userRole === "franchise" ? (
                  <Navigate to="/franchise-dashboard" replace />
                ) : userRole === "student" ? (
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
                {userRole === "student" ? (
                  <StudentDashboard />
                ) : (
                  <Navigate to="/dashboard" replace />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/franchise-dashboard"
            element={
              <ProtectedRoute>
                {userRole === "franchise" ? (
                  <FranchiseDashboard />
                ) : (
                  <Navigate to="/dashboard" replace />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                {userRole === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/dashboard" replace />
                )}
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
