angular.module('routerApp')
.controller('AccountController', function($scope, $http, store, $state, httpCall, $mdDialog){

    var namesArray = ['V', 'Bruce Wane', 'Luke Skywalker', 'Sherlock Holmes', 'Eliot Anderson', 'C3-P0', 'K2SO', 'R2D2', 'Sheldon Cooper', 'Hercule Poirot', 'HAL 9000'];

    //Refresh the UI
    $scope.refresh = function(){
        $scope.$parent.updateProfile();
    }

    $scope.editPassword = function(){
        var confirm = $mdDialog.prompt()
            .title('Please Enter your new password.')
            .placeholder("Something 6` long")
            .ok('Change now!')
            .cancel("I'm scared I'll forget this one too :-(");

        $mdDialog.show(confirm).then(function(result) {
            var request = {
                method: 'PUT',
                url: '/auth/users',
                headers: {'Authorization': store.get('jwt')},
                data: {field: "password", value: result}
            };
            httpCall.execute(request, function(res){
                $scope.refresh();
            });
        }, function() {
            console.log('Nothing happend. No password was changed here. Or was it?')
        });
    }
    $scope.editName = function(){
        var nameIndex = Math.floor(Math.random()*namesArray.length);
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Please Enter your new display name.')
            .placeholder(namesArray[nameIndex])
            .ok('Change now!')
            .cancel('I like my name as it is thanks');

        $mdDialog.show(confirm).then(function(result) {
            var request = {
                method: 'PUT',
                url: '/auth/users',
                headers: {'Authorization': store.get('jwt')},
                data: {field: "name", value: result}
            };
            httpCall.execute(request, function(res){
                $scope.refresh();
            });
        }, function() {
            console.log('Nothing happend.')
        });
    }

    $scope.editNumber = function(){
        var nameIndex = Math.floor(Math.random()*namesArray.length);
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Please Enter your Phone Number.')
            .placeholder('+1 (877) kars-4-kids')
            .ok('Change now!')
            .cancel('Ah, Cant afford this new plan');

        $mdDialog.show(confirm).then(function(result) {
            var request = {
                method: 'PUT',
                url: '/auth/users',
                headers: {'Authorization': store.get('jwt')},
                data: {field: "number", value: result}
            };
            httpCall.execute(request, function(res){
                $scope.refresh();
            });
        }, function() {
            console.log('Nothing happend. Just an ordinary day....');
        });
    }
    
});