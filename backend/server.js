const express = require('express');
const session = require('express-session'); // handles session management
const passport = require('passport');
const dotenv = require('dotenv');
const initializePassport = require('./config/passport'); // Init passport config
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const transactionRoutes = require('./routes/transactiionRoutes');

dotenv.config(); // Loads the environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup 
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({extended: false})); // Parses URL-encoded payload

// Set up session management
app.use(
    session({
        secret: process.env.SESSION.SECRET, // SECRET for the Session ID cookie
        resave: false,
        saveUninitialized: false,
    })
);

// Init Passport for auth
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// register route for different functionalities
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transactionRoutes);

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});