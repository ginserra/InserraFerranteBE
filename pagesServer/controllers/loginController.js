angular.module('appServer')
    .controller('loginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',
            function ($scope, $rootScope, $location, AuthenticationService) {
                // reset login status
                AuthenticationService.ClearCredentials();
                $scope.erroLogin="";

                $scope.login = function () {

                    console.log("LOGIN");
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.username, $scope.password, function(response) {
                        if(response.success) {
                            AuthenticationService.SetCredentials($scope.username, $scope.password);
                            $location.path('/');
                        } else {
                            console.log("LOGIN FALLITO");
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                            $scope.errorLogin="Login Fallito!"
                        }
                    });
                };
            }]);
