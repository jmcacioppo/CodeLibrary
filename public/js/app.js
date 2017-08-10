'use strict';

var codeLibrary = angular.module('codeLibrary',  ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .when('/addLanguage', {
            templateUrl: 'templates/addLanguage.html',
            controller: 'AddLanguageController'
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
    function($scope, $location, auth, $timeout) {
        //Change navbar based on login or logout
        auth.onAuthStateChanged( (user) => {
            $scope.loggedIn = user;
        });
    }
);