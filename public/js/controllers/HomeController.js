'use strict';

codeLibrary.controller('HomeController',
    function($scope) {
        libraryRef.on('value', function(s) {
            console.log(s.val());
        });
    }
);