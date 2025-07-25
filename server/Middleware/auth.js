const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const token = req.cookies.token;


  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;
