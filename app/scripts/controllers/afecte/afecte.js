/**
 * Created by root on 11/08/14.
 */
'use strict';
angular.module('projetApp').controller('AfecteCtrl',
    function ($scope, $rootScope, $http) {
        $scope.state = false;


        $scope.init = function () {

            $http.post('/getAllUser')
                .success(function (data) {
                    console.log(data);
                    $scope.listuser = data;


                }).error(function () {
                    console.log('une erreur');
                });

        };

    });