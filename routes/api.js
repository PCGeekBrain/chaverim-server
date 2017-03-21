var express = require('express');
var config = require("../config/main");
var jwt = require('jsonwebtoken');
var passport = require('passport');
var CallRoutes = require('./calls.js');
var TakeRoutes = require('./take');
var BackupRoutes = require('./backup');
var CancelRoutes = require('./cancel');

//Create The Router
var apiRoutes = express.Router();

// Protect dashboard route with JWT
apiRoutes.use(passport.authenticate('jwt', { session: false }));

// Add the calling api
apiRoutes.use('/calls', CallRoutes);
apiRoutes.use('/calls/cancel', CancelRoutes);
apiRoutes.use('/calls/take', TakeRoutes);
apiRoutes.use('/calls/backup', BackupRoutes);

apiRoutes.get('/profile', function(req, res) {
  res.json({
      success: true,
      messsage: "Successfully retrived user data",
      id: req.user._id,
      name: req.user.name,
      number: req.user.number,
      role : req.user.role,
    });
});


module.exports = apiRoutes;