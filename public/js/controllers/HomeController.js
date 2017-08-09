'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray, $timeout) {        
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

        //$scope.keys.forEach( (key, index) => {
            //$scope.arr[index];
            //$scope.obj[key].name;
        //});


        //Get all keys for refs
        $scope.keys = [];
        $scope.languages = [];

        rootRef.on('value', (snap) => {
            snap.forEach( (language) => {
                $scope.keys.push(language.key);
                $scope.languages.push(language.val().name);
            });
        });


        //Get current key and index of clicked language
        $scope.currentKey = '';
        $scope.currentIndex = '';

        $scope.select = () => {
            console.log($scope.selectedLanguage);
            $scope.keys.forEach( (key, index) => {
                if($scope.selectedLanguage == $scope.obj[key].name) {
                    $scope.currentKey = key;
                    $scope.currentIndex = index;
                }
            });

            console.log('Current key and index', $scope.currentKey, $scope.currentIndex);
        }
        
    }
);