/**
 * Created by root on 10/05/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define the schema for our user model
var complaintsSchema = mongoose.Schema({

    libelle: String,
    category: String,
    description: String,
    state: {
        type: Number,
        default: 3
    },
    cuss: [
        {
            type: ObjectId,
            ref: 'CUS'
        }
    ]

    /* status: {
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
     }]*/

});


module.exports = mongoose.model('Complaints', complaintsSchema);