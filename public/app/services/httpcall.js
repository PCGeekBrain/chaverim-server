angular.module('routerApp').factory('httpCall', function($http, $mdDialog){
    var factory = {}
    factory.execute = function(request, resultcb){
        $http(request).then(resultcb, function(err) {
            if(err.data && !err.data.success){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(err.data.message)
                        .ok('Got it!')
                );
            } else {
                console.log(err);
            }
        });
    }
    return factory
});