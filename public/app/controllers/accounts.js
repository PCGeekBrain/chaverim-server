angular.module('routerApp')
.controller('AccountsController', function($scope, $http, store, $state, $mdDialog, httpCall){
    var vm = this;
    $scope.accounts = []
    $scope.sortType     = '_id'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchAccount   = '';     // set the default search/filter term

    $scope.refresh = function(){
        var request = {method: 'GET',   url: '/auth/users',
            headers: {
                'Authorization': store.get('jwt'),
            }}
        var resultcb = function(res){
            if(res.data.success){$scope.accounts = res.data.users;}
        }
        httpCall.execute(request, resultcb);
    }

    $scope.editUser = function(account){
        var adduser = {
            templateUrl: '/app/views/dialogs/edit_user.html',
            clickOutsideToClose: true,
            controller: function($scope, $mdDialog){
                $scope.user = { email: '',  password: '', name: '', number: '',}    //add user to scope
                $scope.cancel = function() { $mdDialog.cancel(); }  //if they hit cancel dismiss the dialog
                $scope.save = function() {  //if they hit save run the http request
                    httpCall.execute({method: 'PUT',   url: '/auth/users', //Post request to /auth/users with the jwt header
                    headers: {'Authorization': store.get('jwt')},
                    data: {user: account.email, field: $scope.field, value: $scope.value} }, 
                    function(res){ $mdDialog.cancel(); });
                };
            }
        }
        $mdDialog.show(adduser).then(function(result) {$scope.refresh()}, 
            function() {$scope.refresh()});//Do nothing if canceled
    }

    $scope.deleteUser = function(account, ev){
        console.log(account._id);
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this user?')
            .textContent('This CANNOT and I repeat CANNOT be undone')
            .targetEvent(ev)
            .ok("I'm 100% Sure")
            .cancel('Let me think about it');

        $mdDialog.show(confirm).then(function() {
            var request = {
                method: 'DELETE', url: '/auth/users', headers: {'Authorization': store.get('jwt'), user: account.email}
            }
            console.log(request);
            httpCall.execute(request, function(res){ $scope.refresh(); });
        }, function() {
            console.log('Saved by the bell');
        });
    }

    $scope.addAccount = function(ev) {
        var adduser = {
            templateUrl: '/app/views/dialogs/add_account.html',
            clickOutsideToClose: true,
            controller: function($scope, $mdDialog){
                $scope.user = { email: '',  password: '', name: '', number: '',}    //add user to scope
                $scope.cancel = function() { $mdDialog.cancel(); }  //if they hit cancel dismiss the dialog
                $scope.save = function() {  //if they hit save run the http request
                    httpCall.execute({method: 'POST',   url: '/auth/users', //Post request to /auth/users with the jwt header
                    headers: {'Authorization': store.get('jwt')},
                    data: $scope.user }, 
                    function(res){ $mdDialog.cancel(); });
                };
            }
        }
        //Refresh the UI
        $mdDialog.show(adduser).then(function(result) {$scope.refresh()}, 
            function() {$scope.refresh()});//Do nothing if canceled
    }

    $scope.refresh();

});