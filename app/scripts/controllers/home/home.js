'use strict';
angular.module('projetApp').controller('HomeCtrl',
  function ($scope,$rootScope) {
    $scope.state = false;
    $scope.init = function () {
     /* $rootScope.active = {
      home:'start active',
      statistic:'',
      produit:'',
      message:'',
      reclamation:'',
      tableBord:''
    };
      console.log('init du controller home');*/
      //   var socket = io.connect('http://localhost:3000');
      //   socket.on('news', function(data) {
      //     if (data.onlineState) {
      //       $scope.state = data.onlineState;
      //     } else {
      //       $scope.state = data.onlineState;
      //     }
      //     $scope.$digest();
      //     socket.emit('my other event', {
      //       my: 'data'
      //     });
      //   });
    };
  }
);