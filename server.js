var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds111589.mlab.com:11589/app');

var User = require("./models/user.js");
var Marker = require("./models/marker.js");

//------------------------------------------------------------------------------
//logic modifiers
//------------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});


app.use(function(req, res, next) {
    next();
});

// GET method route
app.get('/', function (req, res) {
  res.json({success: true});
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

app.post('/marker', function (req, res) {
	console.log(req.body.marker);

	var marker = new Marker({
		coordinate: req.body.marker.coordinate,
  		description: req.body.marker.description
	});

	marker.save(function(err) {
		console.log(err); 
	});

  	res.json({success: true});
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on '+(process.env.PORT || 3000))
})

