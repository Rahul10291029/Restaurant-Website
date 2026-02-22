// src/App.jsx
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
