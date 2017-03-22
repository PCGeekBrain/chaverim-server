var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app');
    $stateProvider
    //Login view
    .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html'
    })
    // App Section that requires Authentication ===========================
    .state('app', {
        url: '/app',
        templateUrl: 'app/main/app.html',
        data: {
            requireLogin: true // this property will apply to all children of 'app'
        }
    })
    // nested list with just some random string data ======================
    .state('app.calls', {
        url: '/calls',
        templateUrl: 'app/calls/calls.html',
    })
    // Current page lists all the current calls ===========================
    .state('app.current', {
        url: '/current',
        templateUrl: 'app/current/current.html',
        controller: function($scope) {
            $scope.calls = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })
    // nested list with just some random string data ======================
    .state('app.account', {
        url: '/account',
        templateUrl: 'app/account/account.html',
    })
    .state('app.logs', {
        url: '/logs',
        templateUrl: 'app/logs/log.html',
    })
    .state('app.editaccounts', {
        url: '/editaccounts',
        templateUrl: 'app/accounts/accounts.html',
    })
});