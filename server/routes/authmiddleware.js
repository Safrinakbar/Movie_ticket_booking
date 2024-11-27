const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Check if the authorization header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized access: Token missing or malformed' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized access: Invalid token' });
  }
};

module.exports = authenticateUser;
