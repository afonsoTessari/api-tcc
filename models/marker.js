var Mongoose = require('mongoose');


var schema = new Mongoose.Schema({
  coordinate: { 
  	longitude: {type: Number}, 
  	latitude: {type: Number}
  },
  description: {type: String, require: true}
});

var Marker = Mongoose.model('Marker', schema);

module.exports = Marker;

