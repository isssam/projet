'use strict';
angular.module('projetApp').controller('ProduitCtrl',
  function($scope, $rootScope, $http, configuration, serviceGeneral, socket) {
    $scope.state = false;

   /* $scope.ListCategorieProduit = [{
      name: 'SmartPhone'
    }, {
      name: 'Ordinateur'
    }, {
      name: 'Accessoire'
    }, {
      name: 'ComposantInterne'
    }];

    $scope.uploader = {};
    $scope.listProduit = [];
    $scope.barChart = [];
    $scope.totalAmount = 0;*/
    $scope.init = function() {
/*
      $rootScope.active = {
        home: '',
        statistic: '',
        produit: 'start active',
        message: '',
        reclamation: '',
        tableBord: ''
      };
      $http.post(configuration.URL_REQUEST + '/getAllProducts')
        .success(function(data) {
          console.log(data);
          $scope.listProduit = data;
          for (var i = 0; i < $scope.ListCategorieProduit.length; i++) {
            var counter = 0;
            for (var y = 0; y < $scope.listProduit.length; y++) {
              // console.log($scope.ListCategorieProduit[i]);
              // console.log($scope.listProduit[y].categorie)
              if ($scope.ListCategorieProduit[i].name === $scope.listProduit[y].categorie) {
                counter = counter + $scope.listProduit[y].amount;
                // console.log($scope.listProduit[y].amount);
              }
            }
            $scope.totalAmount = $scope.totalAmount + counter;
            $scope.barChart.push({
              categorie: $scope.ListCategorieProduit[i],
              amount: counter
            });
          }
          console.log($scope.barChart);
          console.log($scope.totalAmount);
          $scope.productStockChart($scope.barChart);*/
          // d3.select("#d3donuts")
          //   .selectAll("div")
          //   .data(data)
          //   .enter().append("div")
          //   .style("width", function(d) {
          //     return d * 10 + "px";
          //   })
          //   .text(function(d) {
          //     return d;
          //   });

       /* }).error(function() {
          console.log('une erreur');
        });
        */
    };

  });