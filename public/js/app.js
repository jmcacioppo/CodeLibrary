'use strict';

var codeLibrary = angular.module('codeLibrary',  ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .otherwise({redirectTo: '/'})
    });
