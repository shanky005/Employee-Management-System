import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const registerUser = async (e) => {

    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/auth/register",
      user
    );

    alert("Registration successful");

    navigate("/"); // go to login

  };

  return (

    <div>

      <h2>Register</h2>

      <form onSubmit={registerUser}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br/><br/>

        <button>Register</button>

      </form>

      <p>
        Already have an account?
        <Link to="/"> Login </Link>
      </p>

    </div>

  );

}

export default Register;