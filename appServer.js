angular.module('appServer', ['ngRoute', 'ngMaterial','ngCookies'])
    .constant("addressServer", "http://localhost/server1/php_server/")
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {

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
        })
        .when('/login', {
            templateUrl : 'pagesServer/login.html',
            controller  : 'loginController'
        })
        .when('/register', {
            templateUrl : 'pagesServer/register.html',
            controller  : 'registerController'
        });
}

run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}

