var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var io = require('socket.io');

var app = express();

// Middleware and config
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//Routing

var main = require('./routes/main');
app.use('/',main);


//Socket

var rooms = 0;
// Start the server
const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT,function(){
	console.log("App running on port "+ PORT);
});