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

            console.warn('cussss', $scope.cusdetail);
            console.warn('searchhhh', $location.search().id);
            // console.warn('id=',$location.search().id);
            console.log($rootScope.userConnected);
            $scope.idComp.idComplaint = $location.search().id;

            console.warn('idvar=', $scope.idComp);


            $http.post('/getCusByComplaintId', {idComplaint: $location.search().id})
                .success(function (data) {
                    console.log(data);
                    $scope.listCus = data;

                }).error(function () {
                    console.log('une erreur');
                });

            $scope.getAllTech();


        };
        $scope.getAllTech = function () {
            $http.post('/getAllUser')
                .success(function (data) {
                    console.log(data);
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

            console.warn('statut', $scope.listCus[$scope.listCus.length - 1]);

            $scope.newCuss.idUser = $rootScope.userConnected._id;
            $scope.newCuss.idComplaint = $location.search().id;
            $scope.newCuss.idStatus = $scope.listCus[$scope.listCus.length - 1].idStatus;

            console.log($scope.newCuss);
            $http.post('/editerCus', $scope.newCuss)
                .success(function (data) {
                    console.log('success sign in up');
                    console.log(data);
                    $scope.editComplaint = {};
                    $scope.newCuss = {};
                    $scope.init();
                })
        };


    });