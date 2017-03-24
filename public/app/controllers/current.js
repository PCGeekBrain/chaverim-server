angular.module('routerApp')
.controller('CurrentController', function($scope, $http, $state, httpCall){
    $scope.calls = [];
    $scope.backups = [];

    //Refresh the UI
    $scope.refreshCurrent = function(){
        //TODO
    }
    $scope.refreshBackup = function(){
        //TODO
    }

    $scope.refreshCurrent();
    $scope.refreshBackup();

    $scope.finishCall = function(){
        //TODO
    }
    $scope.cancelCall = function(){
        //TODO
    }
    $scope.finishBackup = function(){
        //TODO
    }
    $scope.cancelBackup = function(){
        //TODO
    }
    
});