import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/register", user);

    alert("Registration successful");

    navigate("/"); // go to login
  };

  return (
    <div className="w-25 col-lg-6 offset-lg-4 text-center mt-4">
      <h2>Register</h2>

      <form onSubmit={registerUser}>
        <input
          name="name"
          placeholder="Name"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange} className="form-control mb-3">
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-success">Register</button>
      </form>

      <p>
        Already have an account?
        <Link to="/"> Login </Link>
      </p>
    </div>
  );
}

export default Register;
