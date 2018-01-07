var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
  nome: { type: String, required: true, unique: true},
  idade: { type: Number }
});

var User = Mongoose.model('User', schema);

module.exports = User;