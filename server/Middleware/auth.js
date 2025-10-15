const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const token = req.cookies.token;


  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment");
      return res.status(500).json({ error: "Server misconfiguration" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;
