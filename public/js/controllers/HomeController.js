'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray, auth) {
        //console.log($scope.showLogin);
        
        $scope.topics = [];

        $scope.adding = {value: ''};
        rootRef.on('value', (snap) => {
            snap.forEach( (currentSnap) => {
                $scope.topics.push(currentSnap.key);
            });
        });

        $scope.test = $firebaseObject(rootRef.child('HTML'));
        $scope.test2 = $firebaseArray(rootRef);
        
        // console.log($scope.test.$id);
        // console.log($scope.test2);

        var count = 0;

        $scope.show = () => {            
            $scope.topics.forEach( (value) => {
                $scope[count] = $firebaseObject(rootRef);
                console.log($scope[count]);
                count++;
            });
        }

        //Add function
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