const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// function authMiddleware(req, res, next) {
// debugger;
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "No token" });

//   }

//   try {

//     const verified = jwt.verify(token, SECRET);

//     req.user = verified;

//     next();

//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }

// }

//import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  //   const token = req.headers.authorization?.split(" ")[1];
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
