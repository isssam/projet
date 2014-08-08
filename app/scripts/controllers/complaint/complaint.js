'use strict';
angular.module('projetApp').controller('CompCtrl',
    function($scope, $rootScope, $http) {
        $scope.state = false;




        $scope.listProduit = [];

        $scope.init = function() {

            $http.post('http://localhost:3000/getAllcomp')
                .success(function(data) {
                    console.log(data);
                    $scope.listcomp = data;


                }).error(function() {
                    console.log('une erreur');
                });

        };

    });