'use strict';

//TODO: bind name, purpose, website
// maybe make purpose a dropdown, radio, etc.
// add to firebase (use arr)

codeLibrary.controller('AddLanguageController',
    function($scope, $firebaseObject, $firebaseArray, $timeout) {   
        $scope.name = '';
        $scope.purpose = '';
        $scope.website = '';
    }
);