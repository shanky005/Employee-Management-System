import React from "react";

function EmployeeAnalytics({ employees }) {

  const totalEmployees = employees.length;

  const departments = [...new Set(employees.map(emp => emp.department))];
  const totalDepartments = departments.length;

  const totalSalary = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
  const avgSalary = totalEmployees ? (totalSalary / totalEmployees).toFixed(2) : 0;

  const highestSalary = employees.length
    ? Math.max(...employees.map(emp => Number(emp.salary || 0)))
    : 0;

  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5>Total Employees</h5>
            <h3>{totalEmployees}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5>Total Departments</h5>
            <h3>{totalDepartments}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5>Average Salary</h5>
            <h3>{avgSalary}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <h5>Highest Salary</h5>
            <h3>{highestSalary}</h3>
          </div>
        </div>
      </div>

    </div>
  );
}

export default EmployeeAnalytics;