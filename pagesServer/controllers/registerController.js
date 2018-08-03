angular.module('appServer')
    .controller('registerController',
        ['$scope', '$rootScope', '$location', 'FlashService','userServices',
            function ($scope, $rootScope, $location, FlashService,userServices) {


                $scope.register = function () {
                    $scope.dataLoading = true;

                    console.log($scope.username+"--"+$scope.email+"--"+$scope.password)
                    var payload = {
                        username:$scope.username,
                        email:$scope.email,
                        password:$scope.password
                    };

                    console.log(payload);
                    userServices.insertUser(payload).then(function (myReponseData) {
                        console.log(myReponseData.data);
                        //se la registrazione è ok
                        if(myReponseData.data ==0){
                            FlashService.Success('Registration successful', true);
                            $location.path('/login');
                        } else {
                            FlashService.Error(response.message);
                            $scope.dataLoading = false;
                        }

                    });
                };
            }]);
