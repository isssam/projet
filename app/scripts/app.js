'use strict';
var projetApp = angular.module('projetApp', ['ngRoute', 'ui.router']);
projetApp.config(
    function($routeProvider, $stateProvider) {
        $stateProvider
            .state('index', {
                url: '',
                views: {
                    'bodyContentView': {
                        templateUrl: 'views/loginSign/loginSign.html',
                        controller: 'LoginSignCtrl'
                    },
                    'footerContentView': {
                        templateUrl: 'views/footer/footer.html'
                    }
                }
            }).state('home', {
                url: '/home',
                views: {
                    'bodyContentView': {
                        templateUrl: 'views/home/home.html',
                        controller: 'CompCtrl'
                    },
                    'footerContentView': {
                        templateUrl: 'views/footer/footer.html'
                    },
                    'sideContentView': {
                        templateUrl: 'views/sideBar/sideBar.html',
                        controller: 'SideBarCtrl'
                    },
                    'headerContentView': {
                        templateUrl: 'views/header/header.html',
                        controller: 'HeaderCtrl'
                    }
                }
            }).state('produit', {
                url: '/produit',
                views: {
                    'bodyContentView': {
                        templateUrl: 'views/produit/produit.html',
                        controller: 'ProduitCtrl'
                    },
                    'footerContentView': {
                        templateUrl: 'views/footer/footer.html'
                    },
                    'sideContentView': {
                        templateUrl: 'views/sideBar/sideBar.html',
                        controller: 'SideBarCtrl'
                    },
                    'headerContentView': {
                        templateUrl: 'views/header/header.html',
                        controller: 'HeaderCtrl'
                    }
                }
            })
    })
/*
angular
  .module('projetApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });*/
