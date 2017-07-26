'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject) {
        rootRef.on('value', function(s) {
            console.log(s.val());
        });

        $scope.test = $firebaseObject(rootRef.child('HTML'));
        console.log($scope.test);
    }
);