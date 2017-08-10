'use strict';
//TODO: Refactor javascript
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

        //Show the table if a language is selected, hide if not
        if($scope.selectedLanguage) $scope.showLanguage = true;
        else $scope.showLanguage = false;

        //Get current key and index of clicked language
        $scope.currentKey = '';
        $scope.currentIndex = '';
        
        $scope.select = () => {
            //Show the table if a language is selected, hide if not
            if($scope.selectedLanguage) $scope.showLanguage = true;
            else $scope.showLanguage = false;
            
            //Get key of selected item
            $scope.keys.forEach( (key, index) => {
                if($scope.selectedLanguage == $scope.obj[key].name) {
                    $scope.currentKey = key;
                    $scope.currentIndex = index;
                }
            });

            //Get info needed for language purpose, website, and table
            $scope.currentCode = [];
            $scope.website = $scope.obj[$scope.currentKey].website;
            $scope.languagePurpose = $scope.obj[$scope.currentKey].purpose;

            Object.keys($scope.obj[$scope.currentKey].coding)
                .forEach( (current) => {
                    $scope.currentCode.push(
                        {"syntax" : $scope.obj[$scope.currentKey].coding[current].syntax,
                         "function" : $scope.obj[$scope.currentKey].coding[current].function,
                         "example" : $scope.obj[$scope.currentKey].coding[current].example
                        });
                });
        }
        
    }
);