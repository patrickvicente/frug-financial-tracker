// controllers/authController.js
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// Registers a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the user into the database
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [
      username,
      email,
      hashedPassword,
    ]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logs in a user
const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Logged in successfully' });
    });
  })(req, res, next);
};

// Logs out a user
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = { registerUser, loginUser, logoutUser };