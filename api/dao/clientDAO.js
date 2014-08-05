'use strict';

var mongoose = require('mongoose');
var Client = mongoose.model('Client');



var fs = require('fs');

exports.addItem = function(req, res) {
	// console.log(req.files);

	var clientData = JSON.parse(req.body.clientData);
	

	
						var newClient = new Client();
						newClient.fullName = clientData.fullName;
						newClient.email = clientData.email;
						newClient.login = clientData.login;
					
						newClient.save(function(err) {
							if (err) {
								console.log(err);
								throw err;
							} else {
								/*global.io.sockets.emit('newClientNotification', {
									lastItem: newClient
								});*/
								console.log('sending result to client');
								return res.jsonp(200, {
									'code': 1,
									'message': 'un nouveau client a ete ajouter'
								});
							}
						});
};
/**
 * Supprimer un client
 */
exports.remove = function(req, res) {
  var client = new Client(req.body.deleteClient);
  client.findById(client._id, function(err, item) {
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
 * Editer un client
 */
exports.update = function(req, res) {
  var clientData = JSON.parse(req.body.clientData);
  var client = new Client(clientData.client);

  

  Client.findById(client._id, function(err, item) {
    if (err) {
      res.send({
        'result': 'error'
      });
    } else {
      item.libelle = client.libelle;
      item.niveau = client.niveau;
      item.position = client.position;
      if (client.picto) {
        item.picto = client.picto;
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

exports.getAllClients = function(req, res) {



	Client.find({}, function(err, clients) {
		if (err) {
			return res.jsonp(500, {
				'code': -1,
				'message': 'Erreur lors de la recuperation'
			});
		} else {
			return res.jsonp(200, clients);
		}
	});
};


exports.findById = function(req, res) {
	var id = req.body.idClient;
	Client
		.findById(id)
		
		.exec(function(err, client) {
			if (err) {
				return res.jsonp(400, {
					'client': 'une erreur innatendu '
				});
			} else {
				return res.jsonp(200, client);
			}
		});
};