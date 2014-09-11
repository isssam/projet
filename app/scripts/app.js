'use strict';
var projetApp = angular.module('projetApp', ['ngRoute', 'ui.router' , 'ngTable', 'ui.bootstrap']);
projetApp.config(
    function ($routeProvider, $stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
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
            }).state('afecte', {
                url: '/afecte',
                views: {
                    'bodyContentView': {
                        templateUrl: 'views/afecte/afecte.html',
                        controller: 'AfecteCtrl'
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
            }).state('detail', {
                url: '/detail',
                views: {
                    'bodyContentView': {
                        templateUrl: 'views/detail/detail.html',
                        controller: 'detailCtrl'
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
            .state('users', {
                url: '/users',
                views: {
                    'bodyContentView': {
                        templateUrl: 'views/users/users.html',
                        controller: 'usersCtrl'
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
        // $locationProvider.html5Mode(true);
    });

projetApp.run(function ($rootScope, $location, $http) {
    $http.get('http://localhost:3000/configuration.json')
        .success(function (data) {
            // you can do some processing here
            console.log('in here');
            $rootScope.config = data;
            console.log($rootScope.config)
        }).error(function (data) {
            console.log(data)
        });
    $rootScope.$on('$locationChangeStart', function (event, next) {

        $http.get('/profile')
            .success(function (result) {
                console.log('profile locationchange');
                console.log(result.role)

                $rootScope.userConnected = result;


                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
                console.log(next)
                if (next && (next == 'http://localhost:3000/#/') && (result.role == 'admin' || result.role == 'client' || result.role == 'tech'))
                    $location.path('/home');
                /* if (next && (next.indexOf('home') || next.indexOf('detail')) && (result.role != 'admin' || result.role != 'client' || result.role != 'tech')) {
                 console.log('jhfffffhhhh');
                 $location.path('/');
                 }*/
                /*if (next && (next.indexOf('users')  && (result.role != 'admin' ))  ) {
                 console.log('jhfffffhhhh');
                 $location.path('/');
                 }*/
            })
            .error(function () {
                if (next) {
                    console.log('jhhhddddddhh');
                    if ((next.indexOf('home') || next.indexOf('detail') || next.indexOf('users'))) {
                        $location.path('/');
                    }
                }
            });
    });
})
;
