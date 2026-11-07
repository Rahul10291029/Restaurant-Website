// src/App.jsx - v2.0.0 (Moved to new application)
import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./components/Gallery";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContentEditor from "./pages/ContentEditor";
import TranslationEditor from "./pages/TranslationEditor";
import ProtectedRoute from "./components/ProtectedRoute";
import { ContentProvider } from "./context/ContentContext";

const App = () => {
  return (
    <ContentProvider>
      {/* ===== "WE'VE MOVED" OVERLAY ===== */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "48px 36px",
            maxWidth: "560px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Icon */}
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🍽️</div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 12px 0",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            We've Moved!
          </h1>

          {/* Sub-text */}
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "rgba(255, 255, 255, 0.85)",
              margin: "0 0 32px 0",
              lineHeight: 1.6,
            }}
          >
            Our restaurant website has a brand-new home.
            <br />
            Visit us at our new address for menus, reservations, and more.
          </p>

          {/* CTA Button */}
          <a
            href="https://indian-spices.ch/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "16px 48px",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(135deg, #d4a853, #b8860b)",
              borderRadius: "50px",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 4px 20px rgba(212, 168, 83, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 6px 28px rgba(212, 168, 83, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(212, 168, 83, 0.4)";
            }}
          >
            Visit New Website →
          </a>

          {/* URL hint */}
          <p
            style={{
              marginTop: "20px",
              fontSize: "0.85rem",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            indian-spices.ch
          </p>
        </div>
      </div>

      {/* ===== ORIGINAL SITE (blurred behind overlay) ===== */}
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
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/content" 
            element={
              <ProtectedRoute>
                <ContentEditor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/translations" 
            element={
              <ProtectedRoute>
                <TranslationEditor />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </ContentProvider>
  );
};

export default App;
