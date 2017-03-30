var express = require('express');
var config = require("../config/main");
var jwt = require('jsonwebtoken');
var passport = require('passport');
var Call = require('../app/models/call');
var User = require('../app/models/user');
var notifyDispatchers = require('../app/functions/notifyDispatchers');

var CancelRoutes = express.Router();

/**
 * POST -> Cancel a call
 */
CancelRoutes.post('/', function(req, res){
    //Validate that the user is allowed to do this
    if (['dispatcher', 'moderator', 'admin'].indexOf(req.user.role) >= 0){
        if(req.body.id){
            Call.findOne({finished: false, _id: req.body.id}, {__v: 0}, function(err, call){
                if (err){
                    return res.status(500).json({success: false, error: err, message: "Internal Server Error"});
                };
                if (call == null){
                    return res.status(400).json({success: false, message:"Call does not exist"});
                } else {
                    call.finished = true;
                    call.canceled = true;
                    call.canceled_by = {
                        name: req.user.name,
                        email: req.user.email,
                        number: req.user.number
                    }
                    call.save(function(err, call, numAffected){
                        if(err){
                            return res.status(500).json({success: false, error: err, message: "Internal Server Error"});
                        }
                        notifyDispatchers("Call Canceled", call.title +"...", call.responderId);
                        return res.status(200).json({success: true, call: call});
                    });
                }
            });
            //TODO send notificaiton to all users
        } else {
            console.log(req.body);
            return res.status(400).json({success: false, message: 'No Call ID given'});
        }
    } else {
        return res.status(403).json({success: false, message: 'Invalid Account Permissions'});
    }
});

module.exports = CancelRoutes;