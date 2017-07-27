'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray) {
        $scope.adding = {value: ''};
        rootRef.on('value', function(s) {
            console.log(s.val());
        });

        $scope.test = $firebaseObject(rootRef.child('HTML'));
        $scope.test2 = $firebaseArray(rootRef);
        // console.log($scope.test);
        

        $scope.add = () => {
            $scope.test2.$add({"name" : $scope.adding.value})
            .then( () => {
                console.log('Added!');
            })
            .catch( (error) => {
                console.log(error.message);
            });
        }
    }
);