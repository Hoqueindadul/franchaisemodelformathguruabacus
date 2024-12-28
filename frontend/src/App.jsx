import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "../src/components/NavBar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";

import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Whatwedo from "./pages/Whatwedo";
import Trainers from "./pages/Trainers";
import NotFound from "./pages/NotFound";
import CourseAbacus from "./pages/Course_abacus";
import CourseKidsEnglish from "./pages/Course_kidsEnglish";
import CourseHandwriting from "./pages/Course_handwritting";
import CourseVedicMath from "./pages/Course_vedicMath";
import StudyCenter from "./pages/Study_Center";
import SchoolTieup from "./pages/School_tieup";
import BuyMaterials from "./pages/Buy_materials";
import Cart from "./pages/Cart";

import Dashboard from "./pages/dashbords/student_dashboard/Dashboard";

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/register", "/login"].includes(
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
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/studycenter" element={<StudyCenter />} />
        <Route path="/school-tieup" element={<SchoolTieup />} />
        <Route
          path="/buymaterials"
          element={<BuyMaterials addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/vedicmath" element={<CourseVedicMath />} />
        <Route path="/abacus" element={<CourseAbacus />} />
        <Route path="/handwriting" element={<CourseHandwriting />} />
        <Route path="/kidsenglish" element={<CourseKidsEnglish />} />
        {/* Universal route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
