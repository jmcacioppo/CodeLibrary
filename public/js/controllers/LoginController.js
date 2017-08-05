'use strict';

codeLibrary.controller('LoginController',
    function($scope, $location, auth) {
        $scope.user = auth.currentUser;
        // console.log($scope.user);
        
        $scope.anonymousLogin = () => {
            auth.signInAnonymously()
            .then( () => {
                console.log('Signed in!');
            })
            .catch( (err) => {
                console.log(err.code);
            });

            $location.path('/home');
        }   
    }
);