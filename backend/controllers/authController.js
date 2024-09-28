const bcrypt = require('bcryptjs');
const pool = require('../config/db.js');
const passport = require('passport');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the email is already registered
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [
            username,
            email,
            hashedPassword
        ]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Log in a user
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

// Log out a user
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Logged out successfully' });
    });
};

module.exports = { registerUser, loginUser, logoutUser };