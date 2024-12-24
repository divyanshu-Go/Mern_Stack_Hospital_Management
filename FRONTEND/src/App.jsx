import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import axios from "axios";

const App = () => {
  const {isAuthenticated, setIsAuthenticated, setUser}= useContext(Context);
  useEffect(()=>{
    const fetchUser= async () => {
      try {
        const response= await axios.get("", {withCredentials:true})
        setIsAuthenticated(true)
        setUser(response.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setUser({})
      }
    }
    fetchUser();
  }, [isAuthenticated])

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
