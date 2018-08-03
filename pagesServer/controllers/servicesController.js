angular.module("appServer").controller("servicesController", ['$scope','$http','fileReader','$timeout','$compile','$location','$anchorScroll','servicesServices','$mdDialog',
    function ($scope,$http, fileReader,$timeout,$compile, $location, $anchorScroll,servicesServices,$mdDialog) {

        $scope.counterAdded=0;
        $scope.imageSrc = [];
        getDescription();
        // getServices();

        function getDescription() {

            servicesServices.getDescription().then(function (myReponseData) {
                $scope.description = myReponseData.data[0].description;
            });

        }

        $scope.updateDescription= function () {

            var payload = {
                description: $scope.description
            };
            servicesServices.updateDescription(payload).then(function (myReponseData) {
                getDescription();
            });


        }

        $scope.addDiv = function() {
            $scope.counterAdded = $scope.counterAdded +1;
            var divElement = angular.element(document.querySelector('#space-for-newDiv'));
            var appendHtml = $compile('<div counter="counterAdded"  servicediv >serviceeee</div>')($scope);
            divElement.append(appendHtml);
            // console.log("counter: "+$scope.counterAdded);
        }

        $scope.getServices=function () {
            console.log("GETSERVICES");

            servicesServices.getServices().then(function (myReponseData) {
                var result = myReponseData.data;
                $scope.resultServices = result;
                for (var i = 0; i < result.length; i++) {
                    //$scope.imageSrc[i] = result[i].image;
                    $scope.imageSrc[i] = result[i].image;
                }
            });

        }
        $scope.getServices();

        $scope.updateService = function (id, image, title, content, index_list) {


            var newImage = "";
            if (image == "")
                newImage = $scope.resultServices[index_list].image;
            else
                newImage = image;

            var newTitle = "";
            if (title == undefined)
                newTitle = $scope.resultServices[index_list].title;
            else
                newTitle = title;


            var newContent = "";
            if (content == undefined)
                newContent = $scope.resultServices[index_list].content;
            else
                newContent = content;

            // console.log("--->" + id + "----->" + newImage);
            // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

            var payload = {
                id: id,
                image: newImage,
                title: newTitle,
                content: newContent
            };

            servicesServices.updateService(payload).then(function (myReponseData) {
                $scope.getServices();
            });


        }

        $scope.removeService = function (id) {


            // console.log("--->" + id + "----->" );
            // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

            var payload = {
                id: id
            };

            servicesServices.deleteService(payload).then(function (myReponseData) {
                $scope.getServices();
            });


        }


    }
])

    .directive('servicediv', function($location,$anchorScroll,$http,$window,servicesServices,$mdDialog) {
        return {
            scope: {
                counter: '=',
                callback:'&'
            },
            templateUrl:'pagesServer/single_service.html',
            controller: function($rootScope, $scope, $element) {
                // console.log("ciao service");
                $location.hash('bottomDiv');
                // // call $anchorScroll()
                $anchorScroll();

                $scope.localCounter = $scope.counter;

                $scope.removeDiv=function(counterToRemove){
                    // console.log("REM");
                    // console.log("counter centrale--->: "+$scope.counter+"----cremove"+counterToRemove);
                    var myEl = angular.element( document.querySelector( '#div_service_'+counterToRemove ) );
                    myEl.remove();   //removes element
                };

                $scope.addService=function(image,title,content){

                    var payload = {
                        image:image,
                        title: title,
                        content: content
                    };

                    servicesServices.insertServices(payload).then(function (myReponseData) {
                        showAlert("Inserimento", "Hai inserito un nuovo servizio con successo!");
                        $window.location.reload();

                    });

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

            }
        }
    });


