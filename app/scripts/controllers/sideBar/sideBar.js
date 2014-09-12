'use strict';
angular.module('projetApp').controller('SideBarCtrl',
    function ($scope, $location, $rootScope, $http) {
        $scope.state = false;
        $scope.produitSubMenu = false;

        $scope.isadmin = false;
        $scope.init = function () {

            if ($rootScope.userConnected.role == 'admin')
                $scope.isadmin = true;


        };

        $scope.detailComplaint = function () {

            $location.path('/detail');

            $rootScope.myVar1 = '';
            $rootScope.myVar2 = '';
            $rootScope.myVar = 'active';
        }
        $scope.complaint = function () {

            $location.path('/home');

            $rootScope.myVar = '';
            $rootScope.myVar2 = '';
            $rootScope.myVar1 = 'active';
        }
        $scope.detailUsers = function () {

            $location.path('/users');

            $rootScope.myVar1 = '';
            $rootScope.myVar = '';
            $rootScope.myVar2 = 'active';
        }
        $scope.deconn = function () {
            console.log("in deconn")

            $http.get('/logout')

                .success(function (res) {
                    console.log('goood');

                    $rootScope.userConnected.role = ''
                    $location.path('/')

                }).error(function () {
                    console.log('une erreur');
                });

        };


    }
);