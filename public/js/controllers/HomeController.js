'use strict';
//TODO: THREE WAY BINDING
codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray) {        
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
        $scope.languages = [];

        rootRef.on('value', (snap) => {
            snap.forEach( (currentSnap) => {
                $scope.keys.push(currentSnap.key);
                console.log(currentSnap.key);
                console.log($scope.obj[currentSnap.key]);
            });
        });

        //Get results
        $scope.show = () => {            
            $scope.languages = [];

            $scope.keys.forEach( (key, index) => {
                //console.log($scope.arr[index]);
                $scope.languages.push($scope.obj[key].name);
            });
        }

        //Get current key and index of clicked language
        $scope.currentKey = '';
        $scope.currentIndex = '';

        $scope.currentLanguage = (lang) => {
            $scope.keys.forEach( (key, index) => {
                if(lang == $scope.obj[key].name) {
                    $scope.currentKey = key;
                    $scope.currentIndex = index;
                }
            });

            console.log('Current key and index', $scope.currentKey, $scope.currentIndex);
        }
        
    }
);