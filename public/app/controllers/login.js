angular.module('routerApp')
.controller('LoginControler', function($scope){
    $scope.login = function (email, password) {
        console.log({email, password});
    }
});