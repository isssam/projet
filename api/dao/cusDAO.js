'use strict';

var mongoose = require('mongoose');
var Cus = mongoose.model('CUS');
var Complaint = mongoose.model('Complaints');


var fs = require('fs');

/**
 * Delet CUS
 */
exports.remove = function (req, res) {
    var cus = new CUS(req.body.deleteCus);
    cus.findById(cus._id, function (err, item) {
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
                    res.jsonp(200);
                }
            });
        }
    });
};
/**
 * Editer un cus
 */
exports.update = function (req, res) {

    var cus = new Cus(req.body);
    cus.save(function (err, itemCus) {
            if (err) {

                console.log(err);
                throw err;

            } else {
                console.log(itemCus);

                Complaint.findById(req.body.idComplaint, function (err, item) {
                    if (err) {
                        res.send({

                            'result': 'error2'
                        });
                    } else {
                        console.log(item);

                        item.cuss.push(itemCus);

                        item.save(function (err) {
                            if (err) {
                                res.send({
                                    'result': 'error3'
                                });
                            } else {
                                res.jsonp(200, itemCus);

                            }
                        });


                    }

                });
            }
        }
    )
    ;
}

exports.getAllCus = function (req, res) {

    Cus.find({}, function (err, cus) {
        if (err) {
            return res.jsonp(500, {
                'code': -1,
                'message': 'Erreur lors de la recuperation'
            });
        } else {
            return res.jsonp(200, cus);
        }
    });
};


exports.findById = function (req, res) {
    var id = req.body.idCus;
    Cus
        .findById(id)
        .populate('idUser')
        .exec(function (err, produit) {
            if (err) {
                return res.jsonp(400, {
                    'cus': 'une erreur innatendu '
                });
            } else {
                return res.jsonp(200, produit);
            }
        });
};

exports.findCusByComplaintId = function (req, res) {
    var id = req.body.idComplaint;
    Cus
        .find({idComplaint: id})
        .populate('idComplaint')
        .populate('idUser')
        .exec(function (err, listCus) {
            if (err) {
                return res.jsonp(400, {
                    'cus': 'une erreur innatendu '
                });
            } else {
                return res.jsonp(200, listCus);
            }
        });
};