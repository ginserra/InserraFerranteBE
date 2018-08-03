var serverApp = angular.module('appServer', ['ngRoute', 'ngMaterial','ngCookies']);

serverApp.constant("addressServer", "http://localhost/server1/php_server/");


serverApp.config(function ($routeProvider) {

    console.log("QUIIIII");
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl : 'pagesServer/home.html',
            controller  : 'homeController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pagesServer/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pagesServer/contact.html',
            controller  : 'serverController'
        })
        .when('/servizi', {
            templateUrl : 'pagesServer/service.html',
            controller  : 'servicesController'
        })
        .when('/works', {
            templateUrl : 'pagesServer/work.html',
            controller  : 'workController'
        });
});




// create the controller and inject Angular's $scope
serverApp.controller('serverController', function ($scope, $http) {


});