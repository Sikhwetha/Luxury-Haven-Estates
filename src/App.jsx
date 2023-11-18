import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './pages/Home';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
