'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray, auth) {        
        //Value to be added
        $scope.adding = {value: ''};

        //Add function
        $scope.add = () => {
            $scope.arr.$add({"name" : $scope.adding.value})
            .then( () => {
                console.log('Added!');
            })
            .catch( (error) => {
                console.log(error.message);
            });
        }
        

        $scope.obj = $firebaseObject(rootRef);
        $scope.arr = $firebaseArray(rootRef);

        console.log($scope.obj);
        console.log($scope.arr);


        //Get all keys for refs
        $scope.keys = [];
        rootRef.on('value', (snap) => {
            snap.forEach( (currentSnap) => {
                $scope.keys.push(currentSnap.key);
            });
        });

        //Get results
        $scope.show = () => {            
            $scope.languages = [];

            $scope.keys.forEach( (key) => {
                //$scope[count] = $firebaseObject(rootRef + '/' + key);
                $scope.languages.push($scope.obj[key].name);
            });

            console.log($scope.languages);
        }

        
    }
);