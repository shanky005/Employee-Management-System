import React, { useState } from "react";
import { addEmployee } from "../api";
import { toast } from "react-toastify";

function AddEmployee({ refresh }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !employee.name ||
      !employee.department ||
      !employee.email ||
      !employee.salary
    ) {
      alert("All Fields mandatory");
      return;
    }
    await addEmployee(employee);
    
    refresh();

    toast.success("Employee Added Successfully 🎉");

    // reset form
    setEmployee({
      name: "",
      email: "",
      department: "",
      salary: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input
            name="name"
            placeholder="Name*"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            name="email"
            placeholder="Email*"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            name="department"
            placeholder="Department*"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            name="salary"
            placeholder="Salary*"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add Employee</button>
        </div>
      </div>
    </form>
  );
}

export default AddEmployee;
