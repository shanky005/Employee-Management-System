import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import EmployeeList from "./components/EmployeeList";

//import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />

        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>

    // <div className="container mt-4">
    //   <h1 className="bg-secondary text-white p-3 text-center">Employee Management</h1>
    //   <AddEmployee />
    //   <EmployeeList />

    //   <ToastContainer position="top-right" autoClose={3000} />
    // </div>
  );
}

export default App;
