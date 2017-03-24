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
      email: req.user.email,
      name: req.user.name,
      number: req.user.number,
      role : req.user.role,
    });
});

//TODO make this whole thing into its own subroute
apiRoutes.post('/device/register', function(req, res) {
  console.log(req.body);
  if(req.body.token){
    if (req.user.devices.indexOf(req.body.token) < 0){
        req.user.devices.push(req.body.token);
        return res.status(200).json({success: true, messsage: "Added Device", devices: req.user.devices})
    }else {
      return res.status(401).json({success: false, messsage: "Device already Registered"})
    }
    //TODO add to main list
  } else {
    return res.status(401).json({success: false, messsage: "Invalid Request"})
  }
});

apiRoutes.delete('/device/register', function(req, res) {
  console.log(req.header);
  if(req.header.token){
    if (req.user.devices.indexOf(req.header.token) < 0){
        req.user.devices.splice(req.user.devices.indexOf(req.header.token), 1);
        return res.status(200).json({success: true, messsage: "Removed Device", devices: req.user.devices})
    }else {
      return res.status(401).json({success: false, messsage: "Device already Registered"})
    }
    //TODO add to main list
  } else {
    return res.status(401).json({success: false, messsage: "Invalid Request"});
  }
});

module.exports = apiRoutes;