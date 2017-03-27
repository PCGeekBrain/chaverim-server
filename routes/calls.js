var express = require('express');
var config = require("../config/main");
var jwt = require('jsonwebtoken');
var passport = require('passport');
var Call = require('../app/models/call');
var sendPush = require('../vendors/ionic_psuh')

var CallRoutes = express.Router();

/**
 * GET -> Returns list of unfinished calls
 */
CallRoutes.get('/', function(req, res){
    Call.find({finished: false}, {__v: 0}, function(err, calls){
        if(err){return res.status(500).json({success: false, error: err})};
        res.status(200).json({success: true, calls: calls});
    });
});

CallRoutes.get('/all', function(req, res){
    Call.find({}, function(err, calls){
        if(err){return res.status(500).json({success: false, error: err})};
        res.status(200).json({success: true, calls: calls});
    });
})

/**
 * POST -> adds a call, dispatcher or higher required
 * body: title, details, location, name, number
 */
CallRoutes.post('/', function(req, res){
    if (['dispatcher', 'moderator', 'admin'].indexOf(req.user.role) >= 0){
        if (!req.body.title && !req.body.details && !req.body.location && !req.body.name && !req.body.number){
            return res.status(400).json({success: false, message: "No information given"});
        };
        var call = new Call({
            title: req.body.title,
            details: req.body.details,
            caller: {
                location: req.body.location,
                name: req.body.name,
                number: req.body.number,
            },
            responderId: "",
            backupId: "",
            dispatcher:{
                name: req.user.name,
                number: req.user.number,
                email: req.user.email
            }
        });
        call.save(function(err, call, rows_affected){
            if (err) {
                return res.status(500).json({success: false, message: "Server Error"});
            } else{
                res.json({success: true, call: call, rows_affected: rows_affected});
                sendPush(req.body.title, req.body.details);
            }
        });
    } else {
        res.status(401).json({success: false, message: 'Invalid Account Permissions'});
    }
});

/**
 * PUT -> Update Call in the system
 * id -> the id of the call
 * call -> json represntation of the call
 */
CallRoutes.put('/', function(req, res){
    if(['dispatcher', 'moderator', 'admin'].indexOf(req.user.role) >= 0){
        if (req.body.id && req.body.call){
            //TODO
            Call.findOne({_id: req.body.id}, function(err, call){
                if(err){
                    res.status(500).json({success: false, message: 'Internal Server Error'});
                } else {
                    console.log(call.caller);
                    console.log(req.body.call.caller)
                    call.title = req.body.call.title;
                    call.details = req.body.call.details;
                    call.caller = req.body.call.caller;
                    console.log(call);
                    call.save(function(err, finalCall, rows_affected){
                        if (err){
                            res.status(500).json({success: false, message: 'Internal Server Error'});
                        } else {
                            res.json({success: true, message: "Sucessfully updated Call", call: finalCall, rows_affected: rows_affected});
                        }
                    });
                }
            });
        } else {
            res.status(401).json({success: false, message: 'Invalid Request'});
        }
        //TODO
    } else {
        res.status(401).json({success: false, message: 'Invalid Account Permissions'});
    }
})

/**
 * DELETE -> Delete a call from the system, moderator or higher
 * body: id
 */
CallRoutes.delete('/', function(req, res){
    if (['admin'].indexOf(req.user.role) >= 0){
        console.log(req.headers.id)
        Call.findOneAndRemove({_id: req.headers.id}, function(err, call){
            if (err) {return res.status(500).json({success: false, err: err, message: "Internal Server Error"})};
            if (call == null){
                return res.status(400).json({success: false, message: "User Does not exist", id: req.headers.id});
            } else {
                res.status(200).json({success: true, call: call});
            }
        });
        //TODO send notificaiton to all users
    } else {
        res.status(403).json({success: false, message: 'Invalid Account Permissions'});
    }
});

module.exports = CallRoutes