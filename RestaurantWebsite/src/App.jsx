// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./Components/Gallery";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* This wrapper handles navbar offset */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
