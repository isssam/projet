'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model('Product');



var fs = require('fs');

exports.addItem = function(req, res) {
	// console.log(req.files);

//	var productData = JSON.parse(req.body.productData);

						var newProduct = new Product();
						newProduct.libelle = req.body.libelle;
						newProduct.category = req.body.category;
						newProduct.description = req.body.description;

						newProduct.save(function(err) {
							if (err) {
								console.log(err);
								throw err;
							} else {
								/*global.io.sockets.emit('newProductNotification', {
									lastItem: newProduct
								});*/
								console.log('sending result to client');
								return res.jsonp(200, {
									'code': 1,
									'message': 'un nouveau Produit a ete ajouter'
								});
							}
						});
};
/**
 * Supprimer un produit
 */
exports.remove = function(req, res) {
  var product = new Product(req.body.deleteProduct);
  product.findById(product._id, function(err, item) {
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
  var productData = JSON.parse(req.body.productData);
  var product = new Product(productData.product);

  Product.findById(product._id, function(err, item) {
    if (err) {
      res.send({
        'result': 'error'
      });
    } else {
      item.libelle = product.libelle;
      item.category = product.category;
      item.description = product.description;
      
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

exports.getAllProducts = function(req, res) {

	Product.find({}, function(err, products) {
		if (err) {
			return res.jsonp(500, {
				'code': -1,
				'message': 'Erreur lors de la recuperation'
			});
		} else {
			return res.jsonp(200, products);
		}
	});
};


exports.findById = function(req, res) {
	var id = req.body.idProduct;
	Product
		.findById(id)
		
		.exec(function(err, produit) {
			if (err) {
				return res.jsonp(400, {
					'produit': 'une erreur innatendu '
				});
			} else {
				return res.jsonp(200, produit);
			}
		});
};