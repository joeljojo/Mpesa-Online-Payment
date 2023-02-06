const express = require('express');
const router = express.Router();

const mpesaControllers = require('../Controllers/lipanampesa');
const accessToken = require('../Middlewares/accessTocken');

//route to get authentication tocken
router.get('/auth-token', accessToken.authenticationTocken);
// lipa-na-mpesa route
router.post(
  '/lipa-na-mpesa',
  accessToken.authenticationTocken,
  mpesaControllers.lipaNaMpesaOnline
);

// callback route
router.post('/lipa-na-mpesa-callback', mpesaControllers.lipaNaMpesaCallBack);
module.exports = router;
