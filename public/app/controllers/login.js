angular.module('routerApp')
.controller('LoginControler', function($scope, $http, store, $state){
    $scope.user = {};
    $scope.attempts = 0;
    $scope.login = function () {
        if($scope.attempts < 10){
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
                if(err.data && !err.data.success && !err.data.error){
                    $scope.message = err.data.message;
                    $scope.message_class = 'alert-danger';
                } else if(err.data){
                    $scope.message = err.data.error.text;
                    $scope.message_class = 'alert-danger';
                } else{
                    console.log(err);
                }
            })
        } else {
            $scope.message = "To many attempts for this session. Please come back later.";
            $scope.message_class = 'alert-danger';
        }
    }
});