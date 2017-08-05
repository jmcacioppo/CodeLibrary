'use strict';

codeLibrary.controller('LoginController',
    function($scope, $location, $timeout, auth) {
        $scope.anonymousLogin = () => {
            auth.signInAnonymously()
            .then( () => {
                //Alert user that they are logged in
                bootbox.alert({
                    title: "Code Library",
                    message: "You are logged in!",
                    backdrop: true
                });

                //Set timeout to fix async issue
                $timeout($location.path('/home'), 200);
            })
            .catch( (err) => {
                console.log(err.code);
            }); 
        }   
    }
);