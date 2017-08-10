'use strict';
//TODO: fix add button so you can add to each language (use arr)

codeLibrary.controller('HomeController',
    function($scope, $firebaseObject, $firebaseArray, $timeout) {        
        //Initialize variables
        $scope.obj = $firebaseObject(rootRef); // Firebase Object - $scope.obj[key]
        $scope.arr = $firebaseArray(rootRef); // Firebase Array - $scope.arr[index]
        $scope.currentKey = ''; // Key of selected language (for obj)
        $scope.currentIndex = ''; // Index of selected language (for arr)
        $scope.adding = {value: ''}; // Value to be added
        
        getKeys();
        checkSelected();

        // Called on change of option selected in dropdown
        $scope.select = () => {
            checkSelected();
            getSelectedLanguage();
            getLanguageInfo();
        }

        // Called on click of 'Add' button
        $scope.add = () => {
            add();
        }


        // Get all keys for refs
        function getKeys() {
            $scope.keys = [];
            $scope.languages = [];

            rootRef.on('value', (snap) => {
                snap.forEach( (language) => {
                    $scope.keys.push(language.key);
                    $scope.languages.push(language.val().name);
                });
            });
        }

        // Show table if language is selected
        function checkSelected() {
            if($scope.selectedLanguage) $scope.showLanguage = true;
            else $scope.showLanguage = false;
        }
        
        // Get key and index of selected item
        function getSelectedLanguage() {
            $scope.keys.forEach( (key, index) => {
                if($scope.selectedLanguage == $scope.obj[key].name) {
                    $scope.currentKey = key;
                    $scope.currentIndex = index;
                }
            });
        }

        //Get info needed for language purpose, website, and table
        function getLanguageInfo() {
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

        // Function to add a language to the database
        function add() {
            $scope.arr.$add({"name" : $scope.adding.value})
            .then( () => {
                console.log('Added!');
            })
            .catch( (error) => {
                console.log(error.message);
            });
        }
    }
);