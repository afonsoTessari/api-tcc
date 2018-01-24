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
   description: req.body.marker.description,
   category:req.body.marker.category,
   user:req.body.marker.user
 });

	marker.save(function(err) {
		console.log(err);
    if (err){
      res.json({success: false, message: err.message});
    } else{
      res.json({success: true, marker_id:marker._id});
    }
	});

 
});

//get Array
app.get("/ArrayFromApi", function(req, res) {
  Marker.find().exec(function (err, marker) {
    if(err){
      res.json({success: false, error: err.message});
    }else{
      res.json({success: true, marker: marker});
    }
  });
});

app.delete('/remove/:_id', function(req, res) {
  if (!req.params._id) {
    res.json({success: false, message: 'Marcador não encontrado'});
  } else {

    Marker.findOneAndRemove({_id: req.params._id}).exec()
    .then(removed => {
      console.log(removed);

      res.json({ success: true, message: 'Marcador removido.' });
    })
    .catch(err => {
      console.log("Error " + err.message);
      res.json({ success: false, message: err.message });
    });
  }
});

//Register
app.post("/register", function(req, res) {
  if(req.body.email && req.body.password){
    User.findOne({email:req.body.email}).exec(function (err, user) {
      if(err){
        res.json({success: false, message: err.message});
      }else{
        if(user){
          res.json({success: false, message: 'Usuário já cadastrado!'});
        }else{
          var new_user = new User({
            email: req.body.email,
            password: req.body.password,
          });

          new_user.save(function(err, saved_user){
            if(err){
              res.json({success: false, message: err.message});
            }else{
              res.json({success: true, message: 'Registrado com sucesso!', id_user:saved_user._id});
            }
          });
        }
      }
    });
    

  } else{
    res.json({success: false, message: "Preencha os campos"});
  }
});


//Login
app.post("/login", function(req, res) {
  User.findOne({email:req.body.email, password:req.body.password}).exec(function (err, user) {
    if(err){
      res.json({success: false, message: err.message});
    }else{
      if(user){
        res.json({success: true, message: 'Logado com sucesso!', id_user:user._id});
      }else{
        res.json({success: false, message: 'Usuário não encontrado ou senha inválida'});
      }
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log('listening on '+(process.env.PORT || 3000))
})

