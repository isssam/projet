'use strict';
angular.module('projetApp').controller('LoginSignCtrl',
    function ($scope, $http, $location, $rootScope, serviceGeneral) {
        $scope.state = false;
        $scope.newUser = {};
        $scope.errloginAction = false;
        $scope.init = function () {


            console.log('init du login Sign');
            $scope.loginForm = true;
            $scope.recoverPasswordForm = false;
            $scope.createAccountForm = false;

        };

        $scope.creatAccountt = function () {


            $http.post('/signup', $scope.newUser)
                .success(function (data) {
                    console.log('success sign in up');

                })
                .error(function (data) {
                    console.log('erreur interne');
                    console.log(data);
                });
        }


        $scope.authenticate = function () {
            $scope.errloginAction = false;
            if (serviceGeneral.verifLogin($scope.login) && serviceGeneral.verifPassword($scope.password)) {
                // $scope.switchErrOff();

                var data = {
                    login: $scope.login,
                    password: $scope.password
                }

                $http.post('/login', data)
                    .success(function (dataUser) {
                        console.log('success controlleur');


                        $location.path('/home')
                    })
                    .error(function (data) {
                        console.log('errreur login');
                        $scope.errloginAction = true;

                    });
            } else {
                console.log('err');
                $scope.errloginAction = true;
            }
        };

        $scope.switch = function () {
            $scope.loginForm = !$scope.loginForm;
            $scope.recoverPasswordForm = !$scope.recoverPasswordForm;
            $scope.createAccountForm = false;
        };
        $scope.createAccount = function () {
            $scope.loginForm = false;
            $scope.recoverPasswordForm = false;
            $scope.createAccountForm = true;
        };
        $scope.switchAuth = function () {
            $scope.loginForm = true;
            $scope.recoverPasswordForm = false;
            $scope.createAccountForm = false;
        };
        $scope.checkSignFields = function () {
            if (!serviceGeneral.verifEmail($scope.signEmail)) {
                $scope.errEmail = true;
            } else {
                $scope.errEmail = false;
            }
            if (!serviceGeneral.verifLogin($scope.signLogin)) {
                $scope.errLogin = true;
            } else {
                $scope.errLogin = false;
            }
            if (!serviceGeneral.verifName($scope.signName)) {
                $scope.errName = true;
            } else {
                $scope.errName = false;
            }
            if (!serviceGeneral.verifPassword($scope.signPassword) || $scope.signPassword !== $scope.signRPassword) {
                $scope.errPassword = true;
            } else {
                $scope.errPassword = false;
            }
        };
        $scope.switchErrOff = function () {
            $scope.errConfirmation = false;
            $scope.errEmail = false;
            $scope.errPassword = false;
            $scope.errName = false;
            $scope.errLogin = false;
            $scope.errloginAction = false;
        };


        /*$scope.authenticate = function () {
         if (serviceGeneral.verifLogin($scope.loginLogin) && serviceGeneral.verifPassword($scope.passwordLogin)) {
         $scope.switchErrOff();

         var data = {
         login: $scope.loginLogin,
         password: $scope.passwordLogin
         }
         $http.post('/login', data)
         .success(function (data) {
         console.log(data);

         $location.path('/home')
         })
         .error(function (data) {
         console.log(data);
         $scope.errloginAction = true;
         });

         }
         else {
         console.log('err');
         $scope.errloginAction = true;


         }
         }*/

    });

