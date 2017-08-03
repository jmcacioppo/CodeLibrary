'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray) {
        $scope.adding = {value: ''};
        rootRef.on('value', (snap) => {
            snap.forEach( (currentSnap) => {
                console.log(currentSnap.key);
            });
        });

        $scope.test = $firebaseObject(rootRef.child('HTML'));
        $scope.test2 = $firebaseArray(rootRef);
        
        console.log($scope.test.$id);

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