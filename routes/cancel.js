var express = require('express');
var config = require("../config/main");
var jwt = require('jsonwebtoken');
var passport = require('passport');
var Call = require('../app/models/call');
var User = require('../app/models/user');

var CallRoutes = express.Router();

/**
 * GET -> Gets a list of all unfinished calls tied to that user
 */
CallRoutes.get('/', function(req, res){
    Call.find({finished: false, backupId: req.user._id}, {__v: 0}, function(err, calls){
        if(err){return res.status(500).json({success: false, error: err, message: "Internal Server Error"})}
        res.status(200).json({success: true, calls: calls});
    });
});

/**
 * POST -> Allows user to take a call by passing its id in
 */
CallRoutes.post('/', function(req, res){
    //Validate that the user is allowed to do this
    if (['dispatcher', 'moderator', 'admin'].indexOf(req.user.role) >= 0){
        if(req.body.id){
            Call.findOne({finished: false, _id: req.body.id}, {__v: 0}, function(err, call){
                if (err){
                    return res.status(500).json({success: false, error: err, message: "Internal Server Error"})
                };
                if (call == null){
                    return res.status(400).json({success: false, message:"Call does not exist"})
                } else if (call.responderId != "") {
                    return res.status(400).json({success: false, message:"Call Already Taken"})
                } else {
                    call.responder = {
                        name: req.user.name,
                        number: req.user.number,
                    };
                    call.responderId = req.user._id;
                    call.taken = true;
                    call.save(function(err, call, numAffected){
                        if(err){
                            return res.status(500).json({success: false, error: err, message: "Internal Server Error"});
                        }
                        return res.status(200).json({success: true, call: call});
                    });
                }
            });
            //TODO send notificaiton to all users
        } else {
            console.log(req.body);
            return res.status(400).json({success: false, message: 'No ID given'});
        }
    } else {
        return res.status(403).json({success: false, message: 'Invalid Account Permissions'});
    }
});

module.exports = CallRoutes