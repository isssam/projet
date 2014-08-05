// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var techSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        fullName     : String,
        login        : String,
        avatar       : String,
        acces        : Number
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
    complaint: [{
        type: ObjectId,
        ref: 'complaints'
    }]
    affectedby: [{
        type: ObjectId,
        ref: 'Admins'
    }]

});

// methods ======================
// generating a hash
techSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
techSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Technicans',techSchema);