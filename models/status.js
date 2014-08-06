// app/models/statut.js
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// define the schema for our Statut model
var statusSchema = mongoose.Schema({

     
	status: {
        type: String,
        default: 'NOUVEAU'

    }
    
});



// create the model for users and expose it to our app
module.exports = mongoose.model('Status',statusSchema);