/**
 * Created by root on 10/05/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define the schema for our user model
var CUSSchema = mongoose.Schema({

    
    dateOperation: {
        type: Date,
        default: Date.now
    },
    
    idUser: {
        type: ObjectId,
        ref: 'Users'
    },
    idComplaint: {
        type: ObjectId,
        ref: 'Complaints'
    },
    idStatus: {
        type: Number,
        default: 0
    },
    commenter: {
        type: String,
        default: ''
    }
   
});


module.exports = mongoose.model('CUS', CUSSchema);