#Configuration instructions

## Insert a file here called main.js with the following configurations

    module.exports = {
        'secret': 'supersecretkey',    //used for JWT encoding
        'database' : 'mongodb://<user>:<password>@<server address>/<dbs name>',
        'push_api_key': "key from ionic push"
        'push_api_profile': "prod"
    }

# Structure

File            | Perpose
----            | -------
main.js         | Main configurations
passport.js     | passport.js JWT configuration
