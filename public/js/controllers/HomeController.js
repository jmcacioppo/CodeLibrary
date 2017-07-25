'use strict';

codeLibrary.controller('HomeController',
    function($scope) {
        rootRef.on('value', function(s) {
            console.log(s.val());
        });
    }
);