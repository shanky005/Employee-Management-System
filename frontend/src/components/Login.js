import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/employees"); // redirect
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={login}
      className="w-25 col-lg-6 offset-lg-4 text-center mt-4"
    >
      <h2>Login</h2>

      <input
        placeholder="Email"
        className="form-control mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="form-control mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-info">Login</button>

      <p>
        Don't have an account?
        <Link to="/register"> Register </Link>
      </p>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
}

export default Login;
