angular.module('routerApp')
.controller('AppController', function($scope, $http, store, jwtHelper, $state, $interval){
    $scope.tokenExpiresAt = jwtHelper.getTokenExpirationDate(store.get('jwt'));
    $scope.tokenExpiresIn = parseTime($scope.tokenExpiresAt - new Date());
    $scope.currentUser = {};
    $scope.logOut = function(){
        store.remove('jwt');
        $state.go('login');
    }
    // Run on home screen
    $interval(function(){   //every second count down the remaining session time
        $scope.tokenExpiresIn = parseTime($scope.tokenExpiresAt - new Date());
        if($scope.tokenExpiresIn === "0:0:0"){
            $state.go('login'); // when the token is expired go to the login screen
        }
    },1000,0);
    $http({
        method: 'GET',
        url: '/api/profile',
        headers: {Authorization: store.get('jwt')}
    }).then( function(response) {
        if( response.data && response.data.success){
            $scope.currentUser = response.data;
            if ($scope.currentUser.role === 'dispatcher'){
                $scope.currentUser.dispatch = true;
            } else if (['moderator', 'admin'].indexOf($scope.currentUser.role) >= 0){
                $scope.currentUser.dispatch = true;
                $scope.currentUser.moderator = true;
            }
        }
    });
    
    //formatting functions
    $scope.cleantime = function(time){
        var date = new Date(time);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours > 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var finalminutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ":" + finalminutes + " " + ampm;
    }
});

function parseTime(duration) {
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    return hours + ":" + minutes + ":" + seconds;
}