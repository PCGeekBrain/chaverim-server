var User = require('../models/user');
var request = require('request');
var config = require('../../config/main');

var notifyResponders = function(title, message, responderId){
    if(!message || message === undefined || message === null){
        message = "N/A"
    }
    if(!title || title === undefined || title === null){
        title = "N/A"
    }
    
    User.findOne({_id: responderId}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user.devices);
            var options = {
                url: 'https://api.ionic.io/push/notifications',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + config.push_api_key
                },
                json: true,
                body: {
                    "tokens": user.devices,
                    "profile": config.push_api_profile,
                    "notification" : {
                        "title": title,
                        "message": message
                    }
                }
            }

            request(options, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else if (!error && response.statusCode != 200){
                    // Print out the response bod                    console.log(body);
                } else {
                    console.log(error);
                }
            });
        }
    });
}

module.exports = notifyResponders;