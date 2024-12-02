const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Fetch user profile by decoding the JWT token
const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the decoded user ID
    const user = await User.findById({_id: decoded._id}).select('name email');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as a response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};

module.exports = {
  getUserProfile,
};

