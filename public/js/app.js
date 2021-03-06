'use strict';

var codeLibrary = angular.module('codeLibrary',  ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'templates/theLibrary.html',
            controller: 'TheLibraryController',
            activetab: 'theLibrary'
        })
        .when('/addLanguage', {
            templateUrl: 'templates/addLanguage.html',
            controller: 'AddLanguageController',
            activetab: 'addLanguage'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController',
            activetab: 'login'
        })
        .when('/logout', {
            templateUrl: 'templates/logout.html',
            controller: 'LogoutController',
            activetab: 'logout'
        })
        .otherwise({redirectTo: '/'})
    });
    
//TODO: app can actually search
codeLibrary.controller('MainController',
    function($scope, auth, $route) {
        $scope.$route = $route;
        
        //Change navbar based on login or logout
        auth.onAuthStateChanged( (user) => {
            $scope.loggedIn = user;
        });

        
        $scope.getSearch = () => {
            var searched = $scope.search.value;
            alert(searched + " has been searched");
            initializeSearch();
        }

        function initializeSearch() {
            $scope.search = {value : ''};
        }
        
    }
);