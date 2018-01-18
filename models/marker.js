var Mongoose = require('mongoose');


var schema = new Mongoose.Schema({
  coordinate: { 
  	longitude: {type: Number}, 
  	latitude: {type: Number}
  },
  description: {type: String, require: true},
  color: {type: String},
});

var Marker = Mongoose.model('Marker', schema);

module.exports = Marker;

