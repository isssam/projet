/**
 * Created by root on 10/05/14.
 */

'use strict';

module.exports = function (app, passport) {


    var productDAO = require('../api/dao/productDAO');
    var userDAO = require('../api/dao/userDAO');
    var complaintDAO = require('../api/dao/complaintDAO');
    var cusDAO = require('../api/dao/cusDAO');
    //passport service check if user is loged
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        console.log('in isloggedIN');
        console.log(req.isAuthenticated());
        if (req.isAuthenticated())

            return next();

        // if they aren't redirect them to the home page
        res.jsonp(400, {
            code: -1,
            message: 'unauthrized'
        });
    }

    function isLoggedInAdmin(req, res, next) {
        var errMessage = {};


        if (req.isAuthenticated()) {
            if (req.user.role !== 'admin') {
                errMessage = {
                    message: 'acces interdit',
                    code: 2
                };
                res.send(401, errMessage);
            } else {
                return next();
            }
        } else {
            errMessage = {
                message: 'non authentifier',
                code: 1
            };
            res.send(401, errMessage);
        }
    }

    app.get('/adminService', isLoggedInAdmin, function (req, res) {
        res.jsonp(200, req.user);
    });

    app.get('/logout', function (req, res) {
        if (req.isAuthenticated()) {
            req.logout();

            res.jsonp(200, { success: true});


            // if they aren't redirect them to the home page
        } else {
            res.jsonp(400, { success: false});

        }


    });

    app.post('/test', function (req, res) {
        res.send(200, req.body);
    });


    app.post('/ajouterUser', userDAO.addItem);
    app.post('/getAllUser', isLoggedInAdmin, userDAO.getAllUsers);

    app.post('/edituser', isLoggedInAdmin, userDAO.updateRole);
    app.post('/getUserById', userDAO.findById);
    app.post('/getAllTech', userDAO.getAllTech);

    app.post('/ajoutercomp', complaintDAO.addItem);

    //************isLoggedInAdmin,...
    app.post('/getAllcomp', isLoggedInAdmin, complaintDAO.getAllComplaints);
    app.post('/getcompById', complaintDAO.getComplaintById);
    app.post('/deleteComp', isLoggedInAdmin, complaintDAO.remove);
    app.post('/getAllComplaintsByUserId', complaintDAO.findAllComplaintsByUserId);

    app.post('/editerCus', cusDAO.update);
    app.post('/getAllCus', cusDAO.getAllCus);
    app.post('/getcusById', cusDAO.findById);
    app.post('/getCusByComplaintId', cusDAO.findCusByComplaintId);

    //service passport
    //passport service signin
    app.post('/signup', passport.authenticate('local-signup', {
            failureRedirect: '/',
            failureFlash: true
        }),
        function (req, res) {
            console.log('success saving user in database');
            res.jsonp(200, req.user);
        });
    //passport service login
    app.post('/login', passport.authenticate('local-login', {
            failureRedirect: '/',
            failureFlash: true
        }),
        function (req, res) {
            if (req.user) {
                res.jsonp(200, req.user);
            } else {
                console.log('sending result');
                res.jsonp(400, null);

            }

        });
    app.get('/profile', isLoggedIn, function (req, res) {
        res.jsonp(200, req.user);
    });

};