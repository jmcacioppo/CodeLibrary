'use strict';

codeLibrary.controller('TheLibraryController',
    function($scope, $firebaseObject, $firebaseArray, $timeout) {        
        //Initialize variables
        $scope.obj = $firebaseObject(rootRef); // Firebase Object - $scope.obj[key]
        $scope.arr = $firebaseArray(rootRef); // Firebase Array - $scope.arr[index]

        $scope.currentKey = ''; // Key of selected language (for obj)
        $scope.currentIndex = ''; // Index of selected language (for arr)
        $scope.sortType = ['nothing' ,'syntax', 'function', 'example'];
        
        initializeInputs();
        getKeys();
        checkSelected();


        // Called on change of option selected in dropdown
        $scope.select = () => {
            checkSelected();
            getSelectedLanguage();
            getLanguageInfo();
        }

        // Add new parts of language
        $scope.addToLanguage = () => {
            getArr();
            addToArr();
            updateTable();
            initializeInputs();
        }

        // Makes field edittable for user and gets info of the data they are editting
        $scope.edit = (data, type) => {
            data.editing = true;
            findDataToEdit(data, type);
        }

        // Saves user changes
        $scope.doneEditing = (data) => {
            var current = $scope.editCurrent;
            var type = $scope.editType;
            saveEdit(current, type);
            data.editing = false;
        }

        // Adds '.name' to end of selected sort so that it works with object
        $scope.fixSort = () => {
            $scope.selectedSort = $scope.sorting + '.name';
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

        // Get info needed for language purpose, website, and table
        function getLanguageInfo() {
            $scope.currentCode = [];
            $scope.website = $scope.obj[$scope.currentKey].website;
            $scope.languagePurpose = $scope.obj[$scope.currentKey].purpose;

            Object.keys($scope.obj[$scope.currentKey].coding)
                .forEach( (current) => {
                    $scope.currentCode.push(
                        {
                            "syntax" : {
                                "name" : $scope.obj[$scope.currentKey].coding[current].syntax,
                                "editing" : false
                            },
                            "function" : {
                                "name" : $scope.obj[$scope.currentKey].coding[current].function,
                                "editing" : false
                            },
                            "example" : {
                                "name" : $scope.obj[$scope.currentKey].coding[current].example,
                                "editing" : false
                            }
                        }
                    );
                });
        }

        // Initialize inputs for adding to language
        function initializeInputs() {
            $scope.add = {
                'syntax' : { name : '', editing : false },
                'function' : { name : '', editing : false },
                'example' : { name : '', editing : false }
            }
        }

        // Get array for adding to language
        function getArr() {
            var addingRef = firebase.database().ref('Languages/' + $scope.currentKey + '/coding');
            $scope.addingArr = $firebaseArray(addingRef);
        }

        // Adds info to firebase
        function addToArr() {
            $scope.addingArr
                .$add({
                    syntax : $scope.add.syntax.name,
                    function : $scope.add.function.name,
                    example : $scope.add.example.name
                })
                .then( () => {
                    bootbox.alert({
                        title: "Code Library",
                        message: "Your code has been added!",
                        backdrop: true
                    });
                })
                .catch( () => {
                    bootbox.alert({
                        title: "Code Library",
                        message: "Your code has NOT been added. Try again.",
                        backdrop: true
                    });
                });
        }

        // Update table after addition to database
        function updateTable() {
            $scope.currentCode.push(
                {
                    "syntax" : {
                        "name" : $scope.add.syntax.name,
                        "editing" : false
                    },
                    "function" : {
                        "name" : $scope.add.function.name,
                        "editing" : false
                    },
                    "example" : {
                        "name" : $scope.add.example.name,
                        "editing" : false
                    }
                }
            );
        }

        // Gets data that user is editting
        function findDataToEdit(data, type) {
            Object.keys($scope.obj[$scope.currentKey].coding)
                .forEach( (current) => {
                    if(data.name == $scope.obj[$scope.currentKey].coding[current][type]) {
                        $scope.editCurrent = current;
                        $scope.editType = type;
                        $scope.edit[type] = data.name;
                    }
                });
        }

        // Saves change by user
        function saveEdit(current, type) {
            $scope.obj[$scope.currentKey].coding[current][type] = $scope.edit[type];

            $scope.obj.$save()
                .then( () => {
                    bootbox.alert({
                        title: "Code Library",
                        message: "Your code has been saved!",
                        backdrop: true
                    });

                    getLanguageInfo()
                })
                .catch( () => {
                    bootbox.alert({
                        title: "Code Library",
                        message: "Your code has NOT been saved. Try again.",
                        backdrop: true
                    });
                });
        }

    }
);