const express = require('express');
const router = express.Router();

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://libraryrender.onrender.com',
  clientID: '3YFtHreJxSzzJ5MOc9wcaXKEtY2CSRnX',
  issuerBaseURL: 'https://dev-e4zgu0pvujfbaqvd.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//returns the user information

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));


module.exports = router;