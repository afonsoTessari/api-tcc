var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
  name: { type: String, required: true, unique: true},
  email: { type: String, required: true }
 // password: { type: String, required: true  }
});

var User = Mongoose.model('User', schema);

module.exports = User;