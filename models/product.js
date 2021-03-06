/**
 * Created by root on 10/05/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define the schema for our user model
var productSchema = mongoose.Schema({

    libelle: String,
    category: String,
    description: String,
   
   
    created: {
        type: Date,
        default: Date.now
    },
    complaint: [{
        type: ObjectId,
        ref: 'Complaints'
    }]
});


module.exports = mongoose.model('Product', productSchema);