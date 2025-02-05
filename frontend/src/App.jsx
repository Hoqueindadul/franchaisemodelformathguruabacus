import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProtectedRoute from "./ProtectRoute";

import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "../src/components/NavBar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";

import About from "./pages/About";
import Whatwedo from "./pages/Whatwedo";

// Courses routes start
import CourseAbacus from "./pages/Courses/Course_abacus";
import CourseKidsEnglish from "./pages/Courses/Course_kidsEnglish";
import CourseHandwriting from "./pages/Courses/Course_handwritting";
import CourseVedicMath from "./pages/Courses/Course_vedicMath";
// Courses routes end

import StudyCenter from "./pages/Study_Center";

// Franchise route start
import Benifit from "./pages/Franchise/Benifit"
import Criteria from "./pages/Franchise/Criteria"
import FranchiseRegistraion from "./pages/Franchise/FranchiseRegistraion"
import FranchiseLogin from "./pages/Franchise/FranchiseLogin";
// Franchise route end

import SchoolTieup from "./pages/School_tieup";

// Trainer routes start
import BecomeTrainer from "./pages/Trainer/BecomeTrainer";
import Trainers from "./pages/Trainer/Trainers";
// Trainer routes end

import BuyMaterials from "./pages/Buy_materials";
import Contact from "./pages/Contact";

// Authentication routes start
import Login from "./pages/Authentications/Login";
import Register from "./pages/Authentications/Register";
// Authentication routes end

// Others routes
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

//payment route
import FeeForm from "./pages/feesCollection/FeeForm";
import Invoice from "./pages/feesCollection/Invoice";
import PaymentPage from "./pages/payments/PaymentPage";

/* DashBoard Route */
import Dashboard from "./pages/dashbords/student_dashboard/Dashboard";


function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/register", "/login", "/franchise-registraion", "/franchise-login"].includes(
    location.pathname
  );

  // Cart state to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div>
      {!hideNavbarFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/whatwedo" element={<Whatwedo />} />
        <Route path="/becomeatrainer" element={<BecomeTrainer />} />

        {/* franchise routes */}

        <Route path="/benifit" element={<Benifit />} />
        <Route path="/criteria" element={<Criteria />} />
        <Route path="/franchise-registraion" element={<FranchiseRegistraion />} />
        <Route path="/franchise-login" element={<FranchiseLogin />} />

        {/* Trainers route */}

        <Route path="/become-trainer" element={<BecomeTrainer />} />
        <Route path="/trainers" element={<Trainers />} />
        
        <Route path="/studycenter" element={<StudyCenter />} />
        <Route path="/school-tieup" element={<SchoolTieup />} />
        <Route
          path="/buymaterials"
          element={<BuyMaterials addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />

        {/* Courses route */}
        <Route path="/vedicmath" element={<CourseVedicMath />} />
        <Route path="/abacus" element={<CourseAbacus />} />
        <Route path="/hand-writing" element={<CourseHandwriting />} />
        <Route path="/kids-english" element={<CourseKidsEnglish />} />

        {/* payment */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/feesForm" element={<FeeForm />} />
        <Route path="/invoice" element={<Invoice />} />

        {/* Universal route */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
