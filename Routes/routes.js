const express = require('express');
const router = express.Router();

const mpesaControllers = require('../Controllers/lipanampesa');

//route to get authentication tocken
router.get('/auth-token', mpesaControllers.authenticationTocken);
// lipa-na-mpesa route
router.post(
  '/lipa-na-mpesa',
  mpesaControllers.authenticationTocken,
  mpesaControllers.lipaNaMpesaOnline
);

// callback route
router.post('/lipa-na-mpesa-callback', mpesaControllers.lipaNaMpesaCallBack);
module.exports = router;
