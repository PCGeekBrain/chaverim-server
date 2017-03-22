angular.module('routerApp')
.controller('AccountsController', function($scope, $http, store, $state, $mdDialog){
    var vm = this;
    $scope.accounts = []
    $scope.sortType     = '_id'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchAccount   = '';     // set the default search/filter term

    // Todo seperate and create refresh
    vm.hitServer = function(request, resultcb){
        $http(request).then(resultcb, function(err) {
            if(err.data && !err.data.success){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(err.data.message)
                        .ok('Got it!')
                );
            } else{
                console.log(err);
            }
        });
    }

    $scope.refresh = function(){
        var request = {method: 'GET',   url: '/auth/users',
            headers: {
                'Authorization': store.get('jwt'),
            }}
        var resultcb = function(res){
            if(res.data.success){$scope.accounts = res.data.users;}
        }
        vm.hitServer(request, resultcb)
    }

    $scope.editUser = function(account){
        console.log(account);
    }

    $scope.addAccount = function(ev) {
        var adduser = {
            templateUrl: '/app/views/dialogs/add_account.html',
            clickOutsideToClose: true,
            controller: function($scope, $mdDialog){
                
                $scope.user = {
                    email: '',  password: '',
                    name: '', number: '',
                }
                $scope.cancel = function() {
                    $mdDialog.cancel();
                }
                $scope.save = function() {
                    console.log($scope.user);
                    vm.hitServer({method: 'POST',   url: '/auth/users',
                    headers: {
                        'Authorization': store.get('jwt'),
                    }, data: $scope.user}, function(res){
                        $mdDialog.cancel();
                    });
                };
            }
        }

        $mdDialog.show(adduser).then(function(result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
        }, function() {
            $scope.status = 'You didn\'t name your dog.';
        });
    }

    $scope.refresh();

});