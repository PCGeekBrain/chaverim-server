angular.module('routerApp')
.controller('CurrentController', function($scope, $http, store, $state, httpCall){
    $scope.calls = [];
    $scope.backups = [];

    //Refresh the UI
    $scope.refreshCurrent = function(){
        var request = {
            method: 'GET',
            url: '/api/calls/take',
            headers: {'Authorization': store.get('jwt')},
        };
        httpCall.execute(request, function(res){
            $scope.calls = res.data.calls;
        });
    }
    $scope.refreshBackup = function(){
        var request = {
            method: 'GET',
            url: '/api/calls/backup',
            headers: {'Authorization': store.get('jwt')},
        };
        httpCall.execute(request, function(res){
            $scope.backups = res.data.calls;
        });
    }

    $scope.refreshCurrent();
    $scope.refreshBackup();

    $scope.finishCall = function(call, ev){
        var request = {
            method: 'PUT',
            url: '/api/calls/take',
            headers: {'Authorization': store.get('jwt')},
            data: {id: call._id}
        };
        httpCall.execute(request, function(res){
            $scope.refreshCurrent();
        });
    }

    $scope.cancelCall = function(call, ev){
        var request = {
            method: 'DELETE',
            url: '/api/calls/take',
            headers: {'Authorization': store.get('jwt'),
                id: call._id
            },
        };
        httpCall.execute(request, function(res){
            $scope.refreshCurrent();
        });
    }
    $scope.finishBackup = function(call, ev){
        var request = {
            method: 'PUT',
            url: '/api/calls/backup',
            headers: {'Authorization': store.get('jwt')},
            data: {id: call._id}
        };
        httpCall.execute(request, function(res){
            $scope.refreshBackup();
        });
    }
    $scope.cancelBackup = function(call, ev){
        var request = {
            method: 'DELETE',
            url: '/api/calls/backup',
            headers: {'Authorization': store.get('jwt'),
                id: call._id
            },
        };
        httpCall.execute(request, function(res){
            $scope.refreshBackup();
        });
    }
    
});