'use strict';

var routerApp = angular.module('routerApp', ['ui.router', 'angular-storage']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app');
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
        }
    })
    // nested list with just some random string data ======================
    .state('app.calls', {
        url: '/calls',
        templateUrl: 'app/views/calls.html',
    })
    // Current page lists all the current calls ===========================
    .state('app.current', {
        url: '/current',
        templateUrl: 'app/views/current.html',
        controller: function($scope) {
            $scope.calls = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })
    // Show the current account and edit it ===============================
    .state('app.account', {
        url: '/account',
        templateUrl: 'app/views/account.html',
    })
    // Show the logs in a table ===========================================
    .state('app.logs', {
        url: '/logs',
        templateUrl: 'app/views/log.html',
    })
    // Show the accounts and allow them to be edited =======================
    .state('app.editaccounts', {
        url: '/editaccounts',
        templateUrl: 'app/views/accounts.html',
    })
});