'use strict';

codeLibrary.controller('LoginController',
    function($scope, $location, auth) {
        console.log('hello');
        $scope.anonymousLogin = () => {
            auth.signInAnonymously().then( () => {
                console.log('Signed in!');
                
            }).catch( (err) => {
                $scope.errorMessage = err.code;
            });

            $scope.user = auth.currentUser;
            if($scope.user) {
                //Show and hide logged in titles based on if logged in or not
                $scope.loggedIn = true;
                $location.path('/home');
            }
            else console.log('not yet');

        }   
    }
);