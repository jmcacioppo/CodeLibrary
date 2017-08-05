'use strict';

codeLibrary.controller('LogoutController',
    function($scope, $location, $timeout, auth) {
        $scope.anonymousLogout = () => {
            auth.signOut();

            //Alert user that they are logged out
            bootbox.alert({
                title: "Code Library",
                message: "You are logged out!",
                backdrop: true
            });

            //Set timeout to fix async issue
            $timeout($location.path('/home'), 200);
        }
    }
);