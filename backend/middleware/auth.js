const jwt = require('jsonwebtoken');

// To check if the user is logged in
const authMiddleware = (req, res, next) => {
  // Getting the token from the request header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token, we will deny access!
  if (!token) return res.status(401).json({ message: 'No token, access denied' });

  try {
    // Verify the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // moving on to the actual route, if verified.
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;