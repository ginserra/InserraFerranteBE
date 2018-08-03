angular.module('appServer')
    .controller('aboutController', ['$scope', '$http', 'fileReader', '$timeout', '$compile', '$location', '$anchorScroll', 'aboutServices',
        function ($scope, $http, fileReader, $timeout, $compile, $location, $anchorScroll, aboutServices) {

            // console.log("CIAO ABOUT");


            $scope.imageSrc = [];
            $scope.resultProfiles = [];
            $scope.selectImage = false;
            $scope.indexSelected = 0;
            $scope.counterAdded = 0;


            getDescription();

            $scope.$on("fileProgress", function (e, progress) {
                $scope.progress = progress.loaded / progress.total;
            });

            $scope.updateProfile = function (id, image, title, subtitle, content, index_list) {


                var newImage = "";
                if (image == "")
                    newImage = $scope.resultProfiles[index_list].image;
                else
                    newImage = image;

                var newTitle = "";
                if (title == undefined)
                    newTitle = $scope.resultProfiles[index_list].title;
                else
                    newTitle = title;

                var newSubtitle = "";
                if (subtitle == undefined)
                    newSubtitle = $scope.resultProfiles[index_list].subtitle;
                else
                    newSubtitle = subtitle;

                var newContent = "";
                if (content == undefined)
                    newContent = $scope.resultProfiles[index_list].content;
                else
                    newContent = content;

                // console.log("--->" + id + "----->" + newImage);
                // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

                var payload = {
                    id: id,
                    image: newImage,
                    title: newTitle,
                    subtitle: newSubtitle,
                    content: newContent
                };

                aboutServices.updateProfile(payload).then(function (myReponseData) {
                    $scope.getProfiles();
                });

            }

            $scope.removeProfile = function (id) {


                // console.log("--->" + id + "----->");
                // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

                var payload = {
                    id: id
                };
                aboutServices.deleteProfile(payload).then(function (myReponseData) {
                    $scope.getProfiles();
                });

            }


            $scope.addDiv = function () {
                $scope.counterAdded = $scope.counterAdded + 1;
                var divElement = angular.element(document.querySelector('#space-for-newDiv'));
                var appendHtml = $compile('<div counter="counterAdded" profilediv></div>')($scope);
                divElement.append(appendHtml);
                // console.log("counter: " + $scope.counterAdded);

                //  angular.element(document.querySelector('#space-for-newDiv')).scrollIntoView({});
            }


            $scope.getProfiles = function () {
                aboutServices.getProfiles().then(function (myReponseData) {
                    // var data = myReponseData.data;

                    var result = myReponseData.data;
                    resultDescriptions = result;
                    $scope.resultProfiles = result;
                    for (var i = 0; i < result.length; i++) {
                        //$scope.imageSrc[i] = result[i].image;
                        $scope.imageSrc[i] = result[i].image;
                    }

                });
            }
            $scope.getProfiles();


            $scope.updateDescription = function () {

                var payload = {
                    description: $scope.description
                };

                aboutServices.updateDescription(payload).then(function (myReponseData) {
                    getDescription();
                });

            }

            function getDescription() {

                aboutServices.getDescription().then(function (myReponseData) {
                    $scope.description = myReponseData.data[0].description;
                });

            }

        }])

    .directive("ngFileSelect", function (fileReader, $timeout) {
        return {
            scope: {
                ngModel: '='
            },
            link: function ($scope, el) {
                function getFile(file) {

                    fileReader.readAsDataUrl(file, $scope)
                        .then(function (result) {
                            $timeout(function () {
                                $scope.ngModel = result;

                            });
                        });
                }

                el.bind("change", function (e) {

                    var file = (e.srcElement || e.target).files[0];
                    getFile(file);
                });
            }
        };
    })

    .directive('profilediv', function ($location, $anchorScroll, $http, $window, aboutServices) {
        return {
            scope: {
                counter: '=',
                callback: '&'
            },
            templateUrl: 'pagesServer/profile.html',
            controller: function ($rootScope, $scope, $element) {
                console.log("ciao profile");
                $location.hash('bottomDiv');
                // // call $anchorScroll()
                $anchorScroll();

                $scope.localCounter = $scope.counter;

                $scope.removeDiv = function (counterToRemove) {
                    // console.log("REM");
                    // console.log("counter centrale--->: " + $scope.counter + "----cremove" + counterToRemove);
                    var myEl = angular.element(document.querySelector('#div_profile_' + counterToRemove));
                    myEl.remove();   //removes element
                };

                $scope.addProfile = function (image, title, subtitle, content) {


                    var payload = {
                        image: image,
                        title: title,
                        subtitle: subtitle,
                        content: content
                    };


                    // console.log("--------------------ADD--------------------: ", payload);

                    aboutServices.insertProfile(payload).then(function (myReponseData) {
                        $scope.callback();

                    });

                }
            }
        }
    })


    .factory("fileReader", function ($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress", {
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    });





