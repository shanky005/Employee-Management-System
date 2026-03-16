const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  salary: Number,
});

module.exports = mongoose.model("Employee", EmployeeSchema);