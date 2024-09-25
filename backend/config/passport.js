const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); // bcrypt for password hashing
const pool = require('./db'); // Import connection to database

// Init passport with a local strategy
function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            // Query the database for the user with the provided email
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user) {
                return done(null, false, {message: 'No user with that email'});
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user); // Authentication successful
            } else {
                return done(null, false, {message: 'Password incorrect'}); // Password does not match
            }
        } catch (err) {
            return done(err); // If error occurred during Auth
        }
    };


    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id)); // serialize user to maintain session
    passport.deserializeUser(async (id, done) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            const user = result.rows[0];
            return done(null, user)
        } catch (err) {
            return done(err);
        }
    });
};

module.exports = initialize; // Exports the initialization function to use in server.js