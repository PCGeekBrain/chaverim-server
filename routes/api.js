var express = require('express');
var config = require("../config/main");
var jwt = require('jsonwebtoken');
var passport = require('passport');

var User = require('../app/models/user');
//Import the routes
var CallRoutes = require('./calls.js');
var TakeRoutes = require('./take');
var BackupRoutes = require('./backup');
var CancelRoutes = require('./cancel');
var DeviceRegisterRoutes = require('./device.register');

//Create The Router
var apiRoutes = express.Router();

// Protect dashboard route with JWT
apiRoutes.use(passport.authenticate('jwt', { session: false }));

// Add the calling api
apiRoutes.use('/calls', CallRoutes);
apiRoutes.use('/calls/cancel', CancelRoutes);
apiRoutes.use('/calls/take', TakeRoutes);
apiRoutes.use('/calls/backup', BackupRoutes);
apiRoutes.use('/device/register', DeviceRegisterRoutes);

apiRoutes.get('/profile', function(req, res) {
  res.json({
      success: true,
      messsage: "Successfully retrived user data",
      email: req.user.email,
      name: req.user.name,
      number: req.user.number,
      role : req.user.role,
      devices: req.user.devices
    });
});

apiRoutes.get('/dispatchertokens', function(req, res) {
  User.find({dispatcher: true}, function(err, results){
    resulting_list = []
    for( index in results){
      resulting_list = resulting_list.concat(results[index].devices);
    }
    return res.status(200).json({devices: resulting_list})
  });
});


module.exports = apiRoutes;