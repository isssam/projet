'use strict';

var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');



var fs = require('fs');

exports.addItem = function(req, res) {
	// console.log(req.files);

	var adminData = JSON.parse(req.body.adminData);
	

	
						var newAdmin = new Admin();
						newAdmin.fullName = adminData.fullName;
						newAdmin.email = adminData.email;
						newAdmin.login = adminData.login;
					
						newAdmin.save(function(err) {
							if (err) {
								console.log(err);
								throw err;
							} else {
								/*global.io.sockets.emit('newAdminNotification', {
									lastItem: newAdmin
								});*/
								console.log('sending result to admin');
								return res.jsonp(200, {
									'code': 1,
									'message': 'un nouveau admin a ete ajouter'
								});
							}
						});
};
/**
 * Supprimer un admin
 */
exports.remove = function(req, res) {
  var admin = new Admin(req.body.deleteAdmin);
  admin.findById(admin._id, function(err, item) {
    if (err) {
      res.send({
        'result': 'error'
      });
    } else {
      item.remove(function(err) {
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
 * Editer un Admin
 */
exports.update = function(req, res) {
  var adminData = JSON.parse(req.body.adminData);
  var admin = new Admin(adminData.admin);

  

  Admin.findById(admin._id, function(err, item) {
    if (err) {
      res.send({
        'result': 'error'
      });
    } else {
      item.libelle = admin.libelle;
      item.niveau = admin.niveau;
      item.position = admin.position;
      if (admin.picto) {
        item.picto = admin.picto;
      }
      item.save(function(err) {
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



exports.getAllAdmins = function(req, res) {



	Admin.find({}, function(err, admins) {
		if (err) {
			return res.jsonp(500, {
				'code': -1,
				'message': 'Erreur lors de la recuperation'
			});
		} else {
			return res.jsonp(200, admins);
		}
	});
};


exports.findById = function(req, res) {
	var id = req.body.idAdmin;
	Admin
		.findById(id)
		
		.exec(function(err, admin) {
			if (err) {
				return res.jsonp(400, {
					'admin': 'une erreur innatendu '
				});
			} else {
				return res.jsonp(200, admin);
			}
		});
};