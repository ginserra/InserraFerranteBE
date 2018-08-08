angular.module('appServer')
    .controller('registerController',
        ['$scope', '$rootScope', '$location', 'FlashService','userServices','$mdDialog',
            function ($scope, $rootScope, $location, FlashService,userServices,$mdDialog) {


				$scope.errorsRegistration=[];
                $scope.register = function () {
                   

                    var payload = {
                        username:$scope.username,
                        email:$scope.email,
                        password:$scope.password
                    };

                  
                    userServices.insertUser(payload).then(function (myReponseData) {
                        console.log(myReponseData.data);
                        //se la registrazione è ok
                        if(myReponseData.data ==0){
                            FlashService.Success('Registration successful', true);
                            $location.path('/login');
                        } else {
                        	if(myReponseData.data.length>0){
                        		$scope.errorsRegistration = myReponseData.data;
                        		console.log("eeee-->",$scope.errorsRegistration);
                        	}
                        	
                            //FlashService.Error(response.message);
                            //$scope.dataLoading = false;
                        }

                    });

                  
                };
                
                function isBlank(s){
                    return isEmpty(s.trim());
                }
                function isEmpty(s){
                    return !s.length;
                }

                
                 function showAlert(title_, content) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    // Modal dialogs should fully cover application
                    // to prevent interaction outside of dialog
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .clickOutsideToClose(true)
                            .title(title_)
                            .textContent(content)
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        //.targetEvent(ev)
                    );
                };
                
                
            }]);
