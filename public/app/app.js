'use strict';

var routerApp = angular.module('routerApp', ['ui.router', 'angular-jwt', 'angular-storage', 'ngMaterial']);

routerApp.config(function($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/app/calls');

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('jwt');
    }
    $httpProvider.interceptors.push('jwtInterceptor');

    $stateProvider
    //Login view
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'LoginControler'
    })
    // App Section that requires Authentication ===========================
    .state('app', {
        url: '/app',
        templateUrl: 'app/views/app.html',
        data: {
            requireLogin: true // this property will apply to all children of 'app'
        },
        controller: 'AppController'
    })
    // nested list with just some random string data ======================
    .state('app.calls', {
        url: '/calls',
        templateUrl: 'app/views/calls.html',
        controller: 'CallsController'
    })
    // Current page lists all the current calls ===========================
    .state('app.current', {
        url: '/current',
        templateUrl: 'app/views/current.html',
        controller: 'CurrentController'
    })
    // Show the current account and edit it ===============================
    .state('app.account', {
        url: '/account',
        templateUrl: 'app/views/account.html',
        controller: 'AccountController'
    })
    // Show the logs in a table ===========================================
    .state('app.logs', {
        url: '/logs',
        templateUrl: 'app/views/log.html',
        controller: 'LogsController'
    })
    // Show the accounts and allow them to be edited =======================
    .state('app.editaccounts', {
        url: '/users',
        templateUrl: 'app/views/accounts.html',
        controller: 'AccountsController'
    })
})
//This forces authentication on the client side (sends to logins screen when token expires)
.run(function($rootScope, $state, store, jwtHelper) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
        if (to.data && to.data.requireLogin) {
            if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                e.preventDefault();
                $state.go('login');
            }
        }
    });
    $rootScope.$on('tokenHasExpired', function() {
        $state.go('login');
    });
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $http, $mdDialog, $location, store) {
    $scope.$on('$routeChangeSuccess', function(e, nextRoute){
        if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
        $scope.pageTitle = nextRoute.$$route.pageTitle + ' | ngEurope Sample' ;
        }
    });
});