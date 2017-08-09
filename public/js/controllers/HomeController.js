'use strict';
//TODO: Refactor javascript
// put stuff in directives
// fix databse so it has examples and syntax is different, get links too
// fix add button so you can add to each language (use arr)
// make a new tab where user can add a new language (use arr)

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
            $scope.keys.forEach( (key, index) => {
                if($scope.selectedLanguage == $scope.obj[key].name) {
                    $scope.currentKey = key;
                    $scope.currentIndex = index;
                }
            });

            $scope.currentSyntax = [];
            $scope.currentFunction = [];

            $scope.languageUse = $scope.obj[$scope.currentKey].function;
            Object.keys($scope.obj[$scope.currentKey].syntax)
                .forEach( (current) => {
                    $scope.currentSyntax.push(
                        {"syntax" : $scope.obj[$scope.currentKey].syntax[current],
                         "function" : current});
                });
        }
        
    }
);