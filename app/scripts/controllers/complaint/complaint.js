'use strict';
angular.module('projetApp').controller('CompCtrl',
    function ($scope, $rootScope, $http, ngTableParams) {
        $scope.state = false;
        $scope.status = ['NOUVEAU', 'EN COURS', 'REJETER', 'VALIDER'];
        $scope.statusColor = ['important', 'warning', 'inverse', 'success'];
        $scope.state = ['Urgent', 'Haut', 'Normal', 'Facultatif'];
        $scope.stateColor = ['red', 'yellow', 'blue', 'green'];
        $scope.newComplaint = {};
        $scope.editComplaint = {};
        $scope.listcomp = [];
        //$scope.selectedStatus = 0;

        $scope.init = function () {

            $http.post('http://localhost:3000/getAllcomp')
                .success(function (data) {
                    console.log(data);
                    $scope.listcomp = data;

                }).error(function () {
                    console.log('une erreur');
                });
            /*$http.post('http://localhost:3000/getAllcomp')
             .success(function (data) {
             console.log(data);
             $scope.listcomp = data;


             }).error(function () {
             console.log('une erreur');
             });*/
            $scope.getAllTech();


        };
        /* $scope.statusArrayFilter = function (stat) {
         return (status.indexOf(item.cuss.indexOf(idStatus)) );
         };*/
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
        /*$scope.alerts = [
         { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
         { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
         ];

         $scope.addAlert = function () {
         $scope.alerts.push({msg: 'Another alert!'});
         };

         $scope.closeAlert = function (index) {
         $scope.alerts.splice(index, 1);
         };*/
        $scope.addComp = function () {
            console.warn('Etat', $scope.state.indexOf($scope.selectedState));

            /*            var data = {
             libelle: $scope.libelle,
             category: $scope.category,
             description: $scope.description,
             state: $scope.state.indexOf($scope.selectedState)
             };*/
            $scope.newComplaint.state = $scope.state.indexOf($scope.selectedState);
            console.log($scope.newComplaint);
            $http.post('/ajoutercomp', $scope.newComplaint)
                .success(function (data) {
                    $scope.newComplaint = {};

                    /*                    $scope.libelle= '';
                     $scope.category= '';
                     $scope.description= '';*/
                    $scope.selectedState = '';
                    $scope.init();
                })
        };

        $scope.initAffecterRec = function (rec) {
            $scope.editComplaint = rec;
            $scope.newCuss = {};
        };


        $scope.editerCus = function () {

            console.warn('statut', $scope.status.indexOf($scope.selectedStatus));
            /*            var data = {
             idComplaint: $scope.recEdit._id,
             idUser: $scope.selectedTech._id,
             commenter: $scope.addRecommandation,
             idStatus: $scope.status.indexOf($scope.selectedStatus)
             };*/

            $scope.newCuss.idComplaint = $scope.editComplaint._id;
            $scope.newCuss.idUser = $scope.selectedTech._id;
            $scope.newCuss.idStatus = $scope.status.indexOf($scope.selectedStatus);

            console.log($scope.newCuss);
            $http.post('http://localhost:3000/editerCus', $scope.newCuss)
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
            $http.post('http://localhost:3000/deleteComp', data)
                .success(function (data) {
                    console.log('success remove');
                    console.log(data);
                    $scope.init();

                })

        };

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 5          // count per page
        }, {
            total: $scope.listcomp.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.listcomp.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

    });