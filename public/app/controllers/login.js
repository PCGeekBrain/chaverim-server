angular.module('routerApp')
.controller('LoginControler', function($scope, $http, store, $state){
    $scope.user = {};
    $scope.attempts = 0;
    $scope.login = function () {
        console.log($scope.user);
        if($scope.attempts < 5){
            $http({
                url: '/auth/authenticate',
                method: 'POST',
                data: $scope.user
            }).then(function(res){
                if(res.data.success){
                    store.set('jwt', res.data.token);
                    $scope.message = "Login successfull";
                    $scope.message_class = 'alert-success';
                    $state.go('app.calls');
                }
            }, function(err) {
                $scope.attempts += 1;
                if(err.data && !err.data.success){
                    $scope.message = err.data.message;
                    $scope.message_class = 'alert-danger';
                } else{
                    console.log(err);
                }
            })
        }
    }
});