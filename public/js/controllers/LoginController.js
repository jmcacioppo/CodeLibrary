'use strict';

codeLibrary.controller('LoginController',
    function($scope, $location, auth) {
        
        $scope.anonymousLogin = function() {
            auth.$signInAnonymously().then(function () {
                $location.path('/home');
            }).catch(function(err) {
                $scope.errorMessage = err.code;
            });
        }
        
    }
);