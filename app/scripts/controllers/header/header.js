'use strict';
angular.module('projetApp').controller('HeaderCtrl',
    function ($scope, $http, $location, $rootScope) {
        $scope.state = false;

        $rootScope.$watch('userConnected ', function () {

            $scope.init();

        });
        $scope.init = function () {

        };
        $scope.deconn = function () {


            $http.get('/logout')

                .success(function (res) {

                    $rootScope.userConnected.role = ''
                    $location.path('/')

                }).error(function () {
                    console.log('une erreur');
                });

        };


    });