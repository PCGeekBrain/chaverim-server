angular.module('routerApp')
.controller('HomeController', function($scope, $http, store, jwtHelper, $state, $interval){
    $scope.tokenExpiresAt = jwtHelper.getTokenExpirationDate(store.get('jwt'));
    $scope.tokenExpiresIn = parseTime($scope.tokenExpiresAt - new Date());
    $interval(function(){
        $scope.tokenExpiresIn = parseTime($scope.tokenExpiresAt - new Date());
        if($scope.tokenExpiresIn === "0:0:0"){
            $state.go('login');
        }
    },1000,0);
});

function parseTime(duration) {
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    return hours + ":" + minutes + ":" + seconds;
}