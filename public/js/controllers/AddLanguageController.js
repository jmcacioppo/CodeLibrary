'use strict';
//TODO: make purpose a dropdown, radio, etc.

codeLibrary.controller('AddLanguageController',
    function($scope, $firebaseObject, $firebaseArray, $timeout) {   
        // Values to be added
        $scope.adding = {
            name : '',
            purpose : '',
            website : ''
        };

        // Firebase Array - $scope.arr[index]
        $scope.arr = $firebaseArray(rootRef); 

        // Called on click of 'Add' button
        $scope.add = () => {
            add();
        }

        // Function to add a language to the database
        function add() {
            console.log('called');
            $scope.arr.$add({
                "name" : $scope.adding.name,
                "purpose" : $scope.adding.purpose,
                "website" : $scope.adding.website
            })
            .then( () => {
                bootbox.alert({
                    title: "Code Library",
                    message: $scope.adding.name + " has been added",
                    backdrop: true
                });
            })
            .catch( (error) => {
                bootbox.alert({
                    title: "Code Library",
                    message: $scope.adding.name + " has NOT been added. Try again.",
                    backdrop: true
                });
            });
        }
    }
);