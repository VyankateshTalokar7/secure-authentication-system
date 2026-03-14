const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // 1️⃣ Check if Authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2️⃣ Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ Attach user info to request
      req.user = decoded;

      // 5️⃣ Allow request to continue
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  // 6️⃣ If no token found
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
