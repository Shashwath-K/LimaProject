import React, {useState, useEffect} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from './components/pages/Homepage';
import WelcomeLoader from './components/loading/welocmeLoader';
import PlayGround from './components/pages/Playground';
import Header from './components/Navigation/Header';
import Footer from './components/Navigation/Footer';
import About from './components/pages/About';
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const authPages = ["/login", "/register"];
  const shouldHideLayout = authPages.includes(currentPath);
  const isRegistrationPage = currentPath === "/register";

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
      {!shouldHideLayout && <Header />}
      <main className={`${shouldHideLayout ? "" : "w-full min-h-screen"} ${isRegistrationPage ? "registration-page" : ""}`}>
        {children}
      </main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<WelcomeLoader />} />
          <Route path="/playground" element={<PlayGround />} />
          <Route path="/header" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/footer" element={<Footer />} />
          {/* Add more routes as needed */}
        </Routes>
        </LayoutWrapper>
      </Router>
  );
};

export default App;
