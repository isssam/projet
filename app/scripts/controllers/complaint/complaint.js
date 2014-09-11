'use strict';
angular.module('projetApp').controller('CompCtrl',
    function ($scope, $rootScope, $http, $location) {
        $scope.state = false;
        $scope.status = ['NOUVEAU', 'EN COURS', 'REJETER', 'VALIDER'];
        $scope.statustech = ['Non affecter', 'EN COURS', 'REJETER', 'VALIDER'];
        $scope.statusTechTech = ['REJETER', 'VALIDER'];
        $scope.statusColor = ['important', 'warning', 'inverse', 'success'];
        $scope.state = ['Urgent', 'Haut', 'Normal', 'Facultatif'];
        $scope.stateColor = ['red', 'yellow', 'blue', 'green'];
        $scope.newComplaint = {};
        $scope.editComplaint = {};
        $scope.listcomp = [];
        $scope.isadmin = false;
        $scope.istech = false;
        $scope.isclient = false;
        $rootScope.myVar = '';
        $rootScope.myVar2 = '';
        $rootScope.myVar1 = 'active';
        $location.search().id = '';
        $scope.inputLibelle = 'disabledInput'
        //$scope.selectedStatus = 0;


        $rootScope.$watch('userConnected ', function () {
            console.log('event recieved');
            $scope.init();
            console.log($rootScope.userConnected);
        });
        $scope.init = function () {
            // console.warn('id couren: ', $rootScope.userConnected._id);
            if ($rootScope.userConnected.role === 'admin') {
                $http.post('/getAllcomp')
                    .success(function (data) {
                        console.log(data);
                        $scope.listcomp = data;
                        $scope.isadmin = true;

                    }).error(function () {
                        console.log('une erreur');
                    });
                console.log('admiin');
            }
            else {
                if ($rootScope.userConnected.role === 'tech')
                    $scope.istech = true;
                if ($rootScope.userConnected.role === 'client')
                    $scope.isclient = true;

                $http.post('/getAllComplaintsByUserId', {idUser: $rootScope.userConnected._id})
                    // $http.post('/getAllcomp')
                    .success(function (data) {
                        console.log(data);
                        $scope.listcomp = data;

                    }).error(function () {
                        console.log('une erreur');
                    });
            }
            /*$http.post('http://localhost:3000/getAllcomp')
             .success(function (data) {
             console.log(data);
             $scope.listcomp = data;


             }).error(function () {
             console.log('une erreur');
             });*/
            $scope.getAllTech();

            console.warn('utilisateur courrent 2:', $rootScope.userConnected);
        };

        /* $scope.statusArrayFilter = function (stat) {
         return (status.indexOf(item.cuss.indexOf(idStatus)) );
         };*/
        $scope.getAllTech = function () {
            $http.post('/getAllTech')
                .success(function (data) {
                    console.log(data);
                    $scope.listUser = data;
                    $scope.selectedTech = $scope.listUser[0];


                }).error(function () {
                    console.log('une erreur');
                });

        };

        $scope.addComp = function () {
            console.warn('Etat', $scope.state.indexOf($scope.selectedState));


            $scope.newComplaint.state = $scope.state.indexOf($scope.selectedState);
            $scope.newComplaint.idUser = $rootScope.userConnected._id;
            console.log($scope.newComplaint);
            $http.post('/ajoutercomp', $scope.newComplaint)
                .success(function (data) {
                    $scope.newComplaint = {};
                    $scope.selectedState = '';
                    $scope.init();
                })
        };

        $scope.initAffecterRec = function (rec) {
            $scope.editComplaint = rec;
            $scope.newCuss = {};
        };


        $scope.editerCus = function () {

            console.warn('statut', $scope.statusTechTech.indexOf($scope.selectedStatusTech));
            console.warn('statut actuelle ', $scope.editComplaint.cuss[0].idStatus);

            $scope.newCuss.idComplaint = $scope.editComplaint._id;
            $scope.newCuss.idUser = $scope.selectedTech._id;
            if ($rootScope.userConnected.role == 'tech') {
                $scope.newCuss.statustech = $scope.statusTechTech.indexOf($scope.selectedStatusTech) + 2;
                $scope.newCuss.idStatus = $scope.editComplaint.cuss[0].idStatus;
            } else if ($scope.editComplaint.cuss[0].statustech !== '0') {
                $scope.newCuss.idStatus = $scope.status.indexOf($scope.selectedStatus);
                $scope.newCuss.statustech = $scope.status.indexOf($scope.selectedStatus);
            }
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
        $scope.removeComp = function () {

            var data = {
                idComplaint: $scope.editComplaint._id
            };
            $http.post('/deleteComp', data)
                .success(function (data) {
                    console.log('success remove');
                    console.log(data);
                    $scope.init();

                })

        };
        $scope.detailUrl = function (rec) {
            $scope.Complaint = rec;
            $location.path("/detail").search({id: rec._id});
        };

        $scope.clearComp = function () {
            $scope.newComplaint = {};
            $scope.editComplaint = {};
            $scope.selectedState = '';
            $scope.selectedTech = '';
            $scope.selectedStatus = '';
            $scope.selectedStatusTech = '';
        };



    });