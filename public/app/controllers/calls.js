angular.module('routerApp')
.controller('CallsController', function($scope, $http, store, $mdDialog, httpCall){
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

    //On page functions
    $scope.takeCall = function(call, ev){
        var request = {
            method: 'POST',
            url: '/api/calls/take',
            headers: {'Authorization': store.get('jwt')},
            data: {id: call._id}
        };

        httpCall.execute(request, function(res){
            $scope.refresh();   //refresh the page after we get the result
        });
    }
    $scope.backupCall = function(call, ev){
        var request = {
            method: 'POST',
            url: '/api/calls/backup',
            headers: {'Authorization': store.get('jwt')},
            data: {id: call._id}
        };

        httpCall.execute(request, function(res){
            $scope.refresh();   //refresh the page after we get the result
        });
    }
    $scope.cancelCall = function(call, ev){
        var request = {
            method: 'POST',
            url: '/api/calls/cancel',
            headers: {'Authorization': store.get('jwt')},
            data: {id: call._id}
        };
        httpCall.execute(request, function(res){
            $scope.refresh();   //refresh the page after we get the result
        });
    }
    $scope.createCall = function(ev){
        var adduser = {
            templateUrl: '/app/views/dialogs/add_call.html',
            clickOutsideToClose: true,
            controller: function($scope, $mdDialog){
                $scope.call = {}    //add user to scope
                $scope.cancel = function() { $mdDialog.cancel(); }  //if they hit cancel dismiss the dialog
                $scope.save = function() {  //if they hit save run the http request
                    httpCall.execute({method: 'POST',   url: '/api/calls', //Post request to /auth/users with the jwt header
                    headers: {'Authorization': store.get('jwt')},
                    data: $scope.call }, 
                    function(res){ $mdDialog.cancel(); });
                };
            }
        }
        //Refresh the UI
        $mdDialog.show(adduser).then(function(result) {
            $scope.refresh()
        }, function() {
            $scope.refresh()
        });
    }
});