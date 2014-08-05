/**
 * Created by root on 10/05/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define the schema for our user model
var RUSSchema = mongoose.Schema({

    
    operation: {
        type: Date,
        default: Date.now
    },
    
    idUser: {
        type: ObjectId,
        ref: 'users'
    }
    idComplaint: {
        type: ObjectId,
        ref: 'Complaints'
    }
    idStatus: {
        type: ObjectId,
        ref: 'Status'
    }
   
});


module.exports = mongoose.model('RUS', complaintSchema);