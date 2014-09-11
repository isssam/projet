'use strict';
angular.module('projetApp').controller('HeaderCtrl',
    function ($scope, $http, $location, $rootScope) {
        $scope.state = false;

        $rootScope.$watch('userConnected ', function () {
            console.log('event recieved');
            $scope.init();
            console.log($rootScope.userConnected);
        });
        $scope.init = function () {
            // var socket = io.connect('http://localhost:3000');
            // socket.on('news', function (data) {
            //   if (data.onlineState) {
            //     $scope.state = data.onlineState;
            //   } else {
            //     $scope.state = data.onlineState;
            //   }
            //   $scope.$digest();
            //   socket.emit('my other event', { my: 'data' });
            // });
        };
        $scope.deconn = function () {


            $http.get('/logout')

                .success(function (res) {
                    console.log('goood');
                    console.log(res);
                    $rootScope.userConnected.role = ''
                    $location.path('/')

                }).error(function () {
                    console.log('une erreur');
                });

        };


    });