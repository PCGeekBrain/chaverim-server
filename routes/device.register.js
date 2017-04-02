var express = require('express');

//Create The Router
var deviceRoutes = express.Router();

deviceRoutes.post('/', function(req, res) {
  if(req.body.token){
    if (req.user.devices.indexOf(req.body.token) >= 0){
        return res.status(401).json({success: false, messsage: "Device already Registered"});
    } else {
      req.user.devices.push(req.body.token);
      req.user.save(function (err) {
        console.log(req.user);
        if (err) {
          return res.status(500).json({ success: false, message: 'Internal Error' });
        }
      });
      return res.status(200).json({success: true, messsage: "Added Device", devices: req.user.devices});
    }
    //TODO add to main list
  } else {
    return res.status(401).json({success: false, messsage: "Invalid Request"})
  }
});

deviceRoutes.delete('/', function(req, res) {
  if(req.headers.token){
    if (req.user.devices.indexOf(req.headers.token) >= 0){
        req.user.devices.splice(req.user.devices.indexOf(req.headers.token), 1);
        req.user.save(function(err){
          if(err){
            return res.status(500).json({success: false, message: "internal Server Error"});
          }
          else{
            return res.status(200).json({success: true, messsage: "Removed Device", devices: req.user.devices});
          }
        });
    } else {
      return res.status(401).json({success: false, messsage: "Device does not exist"});
    }
    //TODO add to main list
  } else {
    return res.status(401).json({success: false, messsage: "Invalid Request"});
  }
});

module.exports = deviceRoutes;