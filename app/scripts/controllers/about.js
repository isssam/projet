'use strict';

/**
 * @ngdoc function
 * @name projetApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the projetApp
 */
angular.module('projetApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
