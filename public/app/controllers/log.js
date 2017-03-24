angular.module('routerApp')
.controller('LogsController', function($scope, $http, store, $state, $mdDialog, httpCall){
    var vm = this;
    $scope.log = []
    $scope.sortType     = '_id'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchAccount   = '';     // set the default search/filter term

    $scope.refresh = function(){
        var request = {method: 'GET',   url: '/api/calls/all',
            headers: {
                'Authorization': store.get('jwt'),
            }}
        var resultcb = function(res){
            if(res.data.success){$scope.log = res.data.calls;}
        }
        httpCall.execute(request, resultcb);
    }

    $scope.refresh();

    $scope.cleantime = function(time){
        var date = new Date(time);
        var timeOfDay = $scope.$parent.cleantime(time);
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + "  " + timeOfDay;
    }

});