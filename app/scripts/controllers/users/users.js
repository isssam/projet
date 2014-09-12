/**
 * Created by root on 27/08/14.
 */
'use strict';
angular.module('projetApp').controller('usersCtrl',
    function ($scope, $rootScope, $http, $location) {

        $scope.state = ['Urgent', 'Haut', 'Normal', 'Facultatif'];
        $scope.params = {
            admin: 0,
            client: 1,
            tech: 2
        };
        $scope.isadmin = false;
        $scope.stateColor = ['red', 'green', 'blue'];
        $scope.roole = ['admin', 'client', 'tech'];
        $scope.newComplaint = {};
        $scope.editComplaint = {};
        $scope.listcomp = [];
        $scope.isadmin = false;
        $scope.editUser = {}
        $rootScope.myVar1 = '';
        $rootScope.myVar = '';
        $rootScope.myVar2 = 'active';
        //$scope.selectedStatus = 0;

        $rootScope.$watch('userConnected ', function () {
            console.log('event recieved');
            $scope.init();

        });
        $scope.init = function () {

            if ($rootScope.userConnected.role === 'admin') {
                $http.post('/getAllUser')
                    .success(function (data) {
                        console.log(data);
                        $scope.listuser = data;
                        $scope.isadmin = true;

                    }).error(function () {
                        console.log('une erreur');
                    });

            }


        };


        $scope.initAffecterRec = function (rec) {
            $scope.editUser = rec;
            $scope.newRole = {};
        };


        $scope.editRole = function () {


            $scope.newRole._id = $scope.editUser._id;

            $scope.newRole.role = $scope.selectedUser;

            $http.post('/edituser', $scope.newRole)
                .success(function (data) {
                    console.log('success sign in up');


                    $scope.newRole = {};
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
        }

        ;


    });