angular.module('routerApp')
.controller('CallsController', function($scope, $http, store, $state, $mdDialog, httpCall){
    $scope.calls = []

    $scope.refresh = function(){
        var request = {method: 'GET',   url: '/api/calls',
            headers: {
                'Authorization': store.get('jwt'),
            }}
        var resultcb = function(res){
            if(res.data.success){$scope.calls = res.data.calls;}
        }
        httpCall.execute(request, resultcb);
    }
    $scope.refresh();
});