# CH Chaverim web server and SPA
*__REST__ web server and static __SPA__ for it built in __node-js__*

*For companion app please see [here](https://github.com/PCGeekBrain/chchavarim)*

# Installation

## Requirments
1. nodejs
2. npm

## Setup
1. Clone repo to system
2. Move into the project folder
3. Install dependancies (```npm install```)
4. Install `nodemon` globaly (`npm install -g nodemon`)
5. Spin it up with `nodemon app.js`

# Structure

File/Folder     | Perpose
----            | -------
app/            | Mongo DB schema
bin/            | App starter script (morgan I think)
config/         | DBS and auth configurations
public/         | Available to the outside world. Angular (1) SPA in here
routes/         | REST API routes located here
views/          | Essentially error and home page. (pug/jade templates)
app.js          | Express server starting point
package.json    | npm dependacys
.gitignore      | Ignore local only files
