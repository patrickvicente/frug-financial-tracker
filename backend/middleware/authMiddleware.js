module.exports = {
    isAuthenticated: (req, res, next) => {
      // Correctly check if user is authenticated
      if (req.isAuthenticated && req.isAuthenticated()) {
        console.log('User is is authenticated', req.isAuthenticated());
        return next();
      }
      console.log('User is not authenticated', req.isAuthenticated());
      res.status(401).json({ error: 'Unauthorized: Please login to access this resource' });
    },
    isAuthorized: (req, res, next) => {
      if (!req.user) {
        return res.status(403).json({ error: 'User not authenticated' });
      }
      const userIdFromSession = req.user.id;
      const userIdFromParams = parseInt(req.params.user_id, 10);
  
      if (userIdFromSession === userIdFromParams) {
        return next();
      }
  
      res.status(403).json({ error: 'Forbidden: You do not have access to this resource' });
    },
  };