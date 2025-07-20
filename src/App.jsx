import React, {useState, useEffect} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from './components/pages/Homepage';
import WelcomeLoader from './components/loading/welocmeLoader';
import PlayGround from './components/pages/Playground';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/welcome" element={<WelcomeLoader />} />
          <Route path="/playground" element={<PlayGround />} />
        </Routes>
      </Router>
  );
};

export default App;
