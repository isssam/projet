/**
 * Created by root on 10/05/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define the schema for our user model
var complaintSchema = mongoose.Schema({

    name: String,
    categorie: String,
    description: String,
    
    status: {
        type: Number,
        default: 0

    },
    validated: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
            },
    createdby: [{
        type: ObjectId,
        ref: 'Clients'
    }]
    treatedby: [{
        type: ObjectId,
        ref: 'Technicans'
    }]
});


module.exports = mongoose.model('Complaints', complaintSchema);