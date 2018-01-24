var Mongoose = require('mongoose');


var schema = new Mongoose.Schema({
  coordinate: { 
  	longitude: {type: Number}, 
  	latitude: {type: Number}
  },
  description: {type: String, require: true},
  category: {type: String, require: true},
  user: {type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

var Marker = Mongoose.model('Marker', schema);

module.exports = Marker;

