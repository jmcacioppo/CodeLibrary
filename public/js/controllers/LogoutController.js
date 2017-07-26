'use strict';

codeLibrary.controller('LogoutController',
    function($scope, $location, auth) {
        $scope.user = auth.currentUser;
        console.log($scope.user);

        $scope.anonymousLogout = () => {
            auth.signOut();
        }
    }
);