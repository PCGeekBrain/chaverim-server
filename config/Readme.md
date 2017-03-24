#Configuration instructions

## Insert a file here called main.js with the following configurations

    module.exports = {
        'secret': 'supersecretkey',    //used for JWT encoding
        'database' : 'mongodb://<user>:<password>@<server address>/<dbs name>',
        'push_api_key': "key from ionic push"
    }

# Structure

File            | Perpose
----            | -------
main.js         | Add this file with a secret for JWT and a mongodb URL
passport.js     | passport JWT configuration


# Notes
ionic push will use a call to prod. make sure this is valid or push notificaitons will be stuck in limbo