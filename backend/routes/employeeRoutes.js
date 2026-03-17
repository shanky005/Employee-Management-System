const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", authMiddleware,  async (req, res) => {
  const employees = await Employee.find();

  res.json(employees);
});

// router.get("/", async (req, res) => {
//   const employees = await Employee.find().sort({name:1});
//   res.json(employees);
// });

router.post("/employees", authMiddleware, authorizeRoles("admin", "hr"), async (req, res) => {
  const employee = new Employee(req.body);

  const saved = await employee.save();

  res.json(saved);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

router.delete("/:id", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);

  res.json({ message: "Employee deleted" });
});

module.exports = router;
