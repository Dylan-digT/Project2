const http = require('http');   // used to spin up the server
const app = require('./app');   //import app

const port = process.env.PORT || 8080;

const server = http.createServer(app);                           //create server

server.listen(port);                                                    //to restart the server
