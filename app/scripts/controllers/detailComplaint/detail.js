'use strict';
angular.module('projetApp').controller('detailCtrl',
    function ($scope, $rootScope, $http, $location) {
        $scope.status = ['NOUVEAU', 'EN COURS', 'REJETER', 'VALIDER'];
        $scope.statusColor = ['important', 'warning', 'inverse', 'success'];
        //$scope.selectedStatus = 0;
        $scope.idComp = {};
        $scope.cusdetail = {};
        $scope.newCuss = {};
        $rootScope.myVar1 = '';
        $rootScope.myVar2 = '';
        $rootScope.myVar = 'active';

        $scope.init = function () {

            // console.warn('id=',$location.search().id);
            console.log($rootScope.userConnected);
            $scope.idComp.idComplaint = $location.search().id;



            $http.post('/getCusByComplaintId', {idComplaint: $location.search().id})
                .success(function (data) {

                    $scope.listCus = data;

                }).error(function () {
                    console.log('une erreur');
                });

            $scope.getAllTech();


        };
        $scope.getAllTech = function () {
            $http.post('/getAllUser')
                .success(function (data) {

                    $scope.listUser = data;
                    $scope.selectedTech = $scope.listUser[0];


                }).error(function () {
                    console.log('une erreur');
                });

        };
        $scope.initdetail = function (rec) {
            $scope.cusdetail = rec;

        };

        $scope.editerCus = function () {


            $scope.newCuss.idUser = $rootScope.userConnected._id;
            $scope.newCuss.idComplaint = $location.search().id;
            $scope.newCuss.idStatus = $scope.listCus[$scope.listCus.length - 1].idStatus;

            console.log($scope.newCuss);
            $http.post('/editerCus', $scope.newCuss)
                .success(function (data) {
                    console.log('success sign in up');

                    $scope.editComplaint = {};
                    $scope.newCuss = {};
                    $scope.init();
                })
        };


    });