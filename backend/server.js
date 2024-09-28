const express = require('express');
const session = require('express-session'); // handles session management
const passport = require('passport');
const dotenv = require('dotenv');
const initializePassport = require('./config/passport'); // Init passport config
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')
const { isAuthenticated, isAuthorized } = require('./middleware/authMiddleware');

dotenv.config(); // Loads the environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup 
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({extended: false})); // Parses URL-encoded payload

// Set up session management
app.use(
    session({
        secret: process.env.SESSION_SECRET, // SECRET for the Session ID cookie
        resave: false,
        saveUninitialized: false,
    })
);

// Init Passport for auth
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// register route for different functionalities
app.use('/auth', authRoutes);
app.use('/user', isAuthenticated, userRoutes);


// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});