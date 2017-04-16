var User = require('../models/user');
var request = require('request');
var config = require('../../config/main');

var notifyRegisteredUsers = function(title, message){
    if(!message || message === undefined || message === null){
        message = "N/A"
    }
    if(!title || title === undefined || title === null){
        title = "N/A"
    }
    
    User.find({}, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            dispatcher_tokens = []
            for( var index = 0; index < results.length; index++){
                dispatcher_tokens = dispatcher_tokens.concat(results[index].devices);
            }
            var options = {
                url: 'https://api.ionic.io/push/notifications',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + config.push_api_key
                },
                json: true,
                body: {
                    "tokens": dispatcher_tokens,
                    "profile": config.push_api_profile,
                    "notification" : {
                        "title": title,
                        "message": message
                    }
                }
            }

            request(options, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    // Print out the response body
                    // console.log(body);
                } else if (!error && response.statusCode != 200){
                    // Print out the response body
                    // console.log(body);
                } else {
                    // console.log(error);
                }
            });
        }
    });
}

module.exports = notifyRegisteredUsers;