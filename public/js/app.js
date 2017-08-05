'use strict';

var codeLibrary = angular.module('codeLibrary',  ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            resolve: { //Inject data before it is completely loaded
                data : (rootRef, $firebaseObject, auth) => {
                    // return auth.requireSignIn().then( () => {
                        return $firebaseObject(rootRef.child('HTML')).$loaded();
                    // });
                }
            }
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .when('/logout', {
            templateUrl: 'templates/logout.html',
            controller: 'LogoutController'
        })
        .otherwise({redirectTo: '/'})
    });

codeLibrary.controller('MainController',
    function($scope, $location, auth) {
        auth.onAuthStateChanged( (user) => {
            $scope.loggedIn = user;
            console.log($scope.loggedIn);
        });
    }
);