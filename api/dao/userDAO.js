'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('Users');


var fs = require('fs');

exports.addItem = function (req, res) {
    // console.log(req.files);
    console.log(req.body);
    var newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.login = req.body.login;
    newUser.password = req.body.password;


    newUser.save(function (err) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log('sending result to user');
            return res.jsonp(200, {
                'code': 1,
                'message': 'un nouveau user a ete ajouter'
            });
        }
    });
};
/**
 * Supprimer un user
 */
exports.remove = function (req, res) {
    var user = new User(req.body.deleteUser);
    user.findById(user._id, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            item.remove(function (err) {
                if (err) {
                    res.send({
                        'result': 'error'
                    });
                } else {
                    // helpers.journalisation(1, req.user, req._parsedUrl.pathname, JSON.stringify(item));
                    res.jsonp(200);
                }
            });
        }
    });
};


/**
 * Editer un user
 */
exports.updateRole = function (req, res) {


    User.findById(req.body._id, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            console.log('utilisateur trouver')

            item.role = req.body.role;
            item.save(function (err) {
                if (err) {
                    res.send({
                        'result': 'error'
                    });
                } else {
                    //helpers.journalisation(1, req.user, req._parsedUrl.pathname, JSON.stringify(item));
                    res.jsonp(200, item);
                }
            });
        }
    });
};

exports.getAllTech = function (req, res) {


    User.find({'role': 'tech'}, function (err, users) {
        if (err) {
            return res.jsonp(500, {
                'code': -1,
                'message': 'Erreur lors de la recuperation'
            });
        } else {
            return res.jsonp(200, users);
        }
    });
};

exports.getAllUsers = function (req, res) {


    User.find({}, function (err, users) {
        if (err) {
            return res.jsonp(500, {
                'code': -1,
                'message': 'Erreur lors de la recuperation'
            });
        } else {
            return res.jsonp(200, users);
        }
    });
};


exports.findById = function (req, res) {
    var id = req.body.idUser;
    User
        .findById(id)

        .exec(function (err, user) {
            if (err) {
                return res.jsonp(400, {
                    'user': 'une erreur innatendu '
                });
            } else {
                return res.jsonp(200, user);
            }
        });
};