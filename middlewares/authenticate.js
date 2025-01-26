const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.AUTH_SECRET_KEY;

module.exports = function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ status: false, message: "Invalid token." });
  }
};
