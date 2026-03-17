import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getEmployees, updateEmployee, deleteEmployee } from "../api";
import { toast } from "react-toastify";
import EmployeeAnalytics from "./EmployeeAnalytics";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editEmployee, setEditEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const role = localStorage.getItem("role");

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    loadEmployees();

  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    const res = await getEmployees();
    setEmployees(res.data);
    setLoading(false);
  };

  //   const loadEmployees = async () => {
  //   try {

  //     setLoading(true);

  //     const token = localStorage.getItem("token");

  //     console.log(token);
  //     console.log('testing');

  //     const res = await axios.get(
  //       "http://localhost:5000/api/employees",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );

  //     setEmployees(res.data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
  };

  // const handleShow = () => {
  //   setEditEmployee({
  //     name: "",
  //     email: "",
  //     department: "",
  //     salary: "",
  //   });
  //   setIsEdit(false);
  //   setShowModal(true);
  // };

  const handleChange = (e) => {
    setEditEmployee({
      ...editEmployee,
      [e.target.name]: e.target.value,
    });
  };

  // ADD EMPLOYEE
  const handleAdd = () => {
    setEmployees([...employees, { ...editEmployee, id: Date.now() }]);
    handleClose();
  };

  // EDIT EMPLOYEE
  const handleEditClick = (emp) => {
    setEditEmployee(emp);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    await updateEmployee(editEmployee._id, editEmployee);
    const updated = employees.map((emp) =>
      emp._id === editEmployee._id ? editEmployee : emp,
    );
    setEmployees(updated);
    handleClose();
    toast.info("Employee update Successfully 🎉");
  };

  // DELETE EMPLOYEE
  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
    toast.error("Employee Delete Successfully 🎉");
  };

  // Search Filter
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination Logic

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="d-md-flex justify-content-between">
        Employee Management{" "}
        <Button
          size="sm"
          variant="danger"
          className="ms-2 float-left"
          onClick={logout}
        >
          Logout
        </Button>
      </h2>

      {/* <Button className="mb-3" onClick={handleShow}>
        Add Employee
      </Button> */}

      <EmployeeAnalytics employees={employees} />
      <h6>Add Employee</h6>
      <AddEmployee />

      {/* Search Box */}
      <h6 className="mt-2">Search</h6>
      <input
        type="text"
        placeholder="Search by name or department"
        value={search}
        className="form-control mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>

                {(role === "admin" || role ==="hr") &&  (
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEditClick(emp)}
                >
                  Edit
                </Button>
                )}

                {role === "admin" && (

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDelete(emp._id)}
                >
                  Delete
                </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              margin: "5px",
              background: currentPage === index + 1 ? "#333" : "#ccc",
              color: "white",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* ADD / EDIT MODAL */}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                value={editEmployee.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={editEmployee.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          {isEdit ? (
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmployeeList;
