'use strict';

var codeLibrary = angular.module('codeLibrary',  ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .otherwise({redirectTo: '/'})
    });

// var josephcacioppo = angular.module('josephcacioppo', ['ngRoute'])
//     .config(function($routeProvider) {
//         $routeProvider
//         .when('/', {
//             templateUrl: 'templates/home.html',
//             controller: 'HomeController'
//         })
//         .when('/aboutme', {
//             templateUrl: 'templates/aboutme.html',
//             controller: 'AboutMeController'
//         })
//         .when('/projects', {
//             templateUrl: 'templates/projects.html',
//             controller: 'ProjectsController'
//         })
//         .when('/resume', {
//             templateUrl: 'templates/resume.html',
//             controller: 'ResumeController'
//         })
//         .otherwise({redirectTo: '/'})
//     });