// var serverApp = angular.module('appServer', ['ngRoute', 'ngMaterial']);
//
// serverApp.constant("addressServer", "http://localhost/server1/php_server/");
//
//
// serverApp.config(function ($routeProvider) {
//
//     console.log("QUIIIII");
//     $routeProvider
//     // route for the home page
//         .when('/', {
//             templateUrl: 'home.html',
//             controller: 'homeController'
//         })
//         // route for the about page
//         .when('/about', {
//             templateUrl: 'pagesServer/about.html',
//             controller: 'aboutController'
//         })
//         // route for the contact page
//         .when('/contact', {
//             templateUrl: 'pagesServer/contact.html',
//             controller: 'serverController'
//         })
//         .when('/servizi', {
//             templateUrl: 'pagesServer/service.html',
//             controller: 'servicesController'
//         })
//         .when('/works', {
//             templateUrl: 'pagesServer/work.html',
//             controller: 'workController'
//         })
//         .when('/login', {
//             templateUrl: 'pagesServer/login.html',
//             controller: 'aboutController'
//         })
//         .otherwise({redirectTo: '/login'});
// });



// create the controller and inject Angular's $scope
angular.module('appServer').controller('serverController', function ($scope, $http) {


});