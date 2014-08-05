'use strict';

var mongoose = require('mongoose');
var Technician = mongoose.model('Technician');



var fs = require('fs');

exports.addItem = function(req, res) {
	// console.log(req.files);

	var technicianData = JSON.parse(req.body.technicianData);
	

	
						var newTechnician = new Technician();
						newTechnician.fullName = technicianData.fullName;
						newTechnician.email = technicianData.email;
						newTechnician.login = technicianData.login;
					
						newTechnician.save(function(err) {
							if (err) {
								console.log(err);
								throw err;
							} else {
								/*global.io.sockets.emit('newTechnicianNotification', {
									lastItem: newTechnician
								});*/
								console.log('sending result to technician');
								return res.jsonp(200, {
									'code': 1,
									'message': 'un nouveau technician a ete ajouter'
								});
							}
						});
};
/**
 * Supprimer un technician
 */
exports.remove = function(req, res) {
  var technician = new Technician(req.body.deleteTechnician);
  technician.findById(technician._id, function(err, item) {
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
 * Editer un produit
 */
exports.update = function(req, res) {
  var technicianData = JSON.parse(req.body.technicianData);
  var technician = new Technician(technicianData.technician);

  

  Technician.findById(technician._id, function(err, item) {
    if (err) {
      res.send({
        'result': 'error'
      });
    } else {
      item.libelle = technician.libelle;
      item.niveau = technician.niveau;
      item.position = technician.position;
      if (technician.picto) {
        item.picto = technician.picto;
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



exports.getAllTechnicians = function(req, res) {



	Technician.find({}, function(err, technicians) {
		if (err) {
			return res.jsonp(500, {
				'code': -1,
				'message': 'Erreur lors de la recuperation'
			});
		} else {
			return res.jsonp(200, technicians);
		}
	});
};


exports.findById = function(req, res) {
	var id = req.body.idTechnician;
	Technician
		.findById(id)
		
		.exec(function(err, technician) {
			if (err) {
				return res.jsonp(400, {
					'technician': 'une erreur innatendu '
				});
			} else {
				return res.jsonp(200, technician);
			}
		});
};