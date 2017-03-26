var request = require('request');
var config = require('../config/main');

var notifyUsers = function(title, message){

    var options = {
        url: 'https://api.ionic.io/push/notifications',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.push_api_key
        },
        json: true,
        body: {
            "send_to_all": true,
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
            console.log(body);
        } else if (!error && response.statusCode != 200){
            // Print out the response body
            console.log(body);
        } else {
            console.log(error);
        }
    });
}

module.exports = notifyUsers;