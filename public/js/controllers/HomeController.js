'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray, auth, checkLogin) {
        if(checkLogin) $scope.showLogin = true;
        else $scope.showLogin = false;

        console.log($scope.showLogin);
        
        $scope.topics = [];

        $scope.adding = {value: ''};
        rootRef.on('value', (snap) => {
            snap.forEach( (currentSnap) => {
                $scope.topics.push(currentSnap.key);
            });
        });

        //console.log($scope.topics);
        $scope.topics.forEach( (value) => {
            console.log(value);
        });

        $scope.test = $firebaseObject(rootRef.child('HTML'));
        $scope.test2 = $firebaseArray(rootRef);
        
        // console.log($scope.test.$id);
        // console.log($scope.test2);

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