angular.module("appServer").controller("blogController", ['$scope','$http','fileReader','$timeout','$compile','$location','$anchorScroll','blogServices','$mdDialog',
    function ($scope,$http, fileReader,$timeout,$compile, $location, $anchorScroll,blogServices,$mdDialog) {

        $scope.counterAdded=0;
        $scope.imageSrc = [];
        $scope.enableBlog=true;
        getDescription();
        $scope.valueEnable="";



        $scope.onChangeSwitch = function(value){
            // console.log(value);
            $scope.enableBlog = value;
            if($scope.enableBlog)
                $scope.valueEnable="Sezione Abilitata";
            else
                $scope.valueEnable="Sezione Disabilitata";

            $scope.updateDescription();
        }


        function getDescription() {

            blogServices.getDescription().then(function (myReponseData) {
                $scope.description = myReponseData.data[0].description;
                if(myReponseData.data[0].visibility==1)
                    $scope.enableBlog=true;
                else
                    $scope.enableBlog=false;
                // console.log("VISIBILITY: ",myReponseData.data[0].visibility);

                if($scope.enableBlog)
                    $scope.valueEnable="Sezione Abilitata";
                else
                    $scope.valueEnable="Sezione Disabilitata";
            });

        }

        $scope.updateDescription= function () {

            var value=0;
            if($scope.enableBlog)
                value=1

            var payload = {
                description: $scope.description,
                visibility:value
            };

            // console.log("payload-->",payload)
            blogServices.updateDescription(payload).then(function (myReponseData) {
                getDescription();
            });


        }


        $scope.addDiv = function() {

                $scope.counterAdded = $scope.counterAdded + 1;
                // console.log("COUNTER: "+$scope.counterAdded);
                var divElement = angular.element(document.querySelector('#space-for-newDiv'));
                var appendHtml = $compile('<div counter="counterAdded"  blogdiv  >blog</div>')($scope);
                divElement.append(appendHtml);
            }


        $scope.getBlogs=function () {
            // console.log("GETBLOGS");

            blogServices.getBlogs().then(function (myReponseData) {
                var result = myReponseData.data;
                $scope.resultBlogs = result;
                for (var i = 0; i < result.length; i++) {
                    //$scope.imageSrc[i] = result[i].image;
                    $scope.imageSrc[i] = result[i].image;
                    var id=result[i].id;
                    getComments(result[i])
                }
            });

        }
        $scope.getBlogs();

        function getComments(blog) {

            // console.log(blog.id);
            var payload = {
                id_blog: blog.id
            };

            // console.log(payload);

            blogServices.getComments(payload).then(function (myReponseData) {
                var result = myReponseData.data;
                // console.log(result);
                blog.n_comments = result.length;
                // console.log(blog);
                // for (var i = 0; i < result.length; i++) {
                //     //$scope.imageSrc[i] = result[i].image;
                //     $scope.imageSrc[i] = result[i].image;
                //     var id=result[i].id;
                //
                // }
            });
        }

        $scope.removeBlog = function(blog){
            showConfirmDialogRemove(blog);
        }

            function deleteBlog(id)  {

                var payload = {
                    id: id
                };

                blogServices.deleteBlog(id).then(function (myReponseData) {
                    console.log(myReponseData.data);
                    $scope.getBlogs();
                });

            }

        function showConfirmDialogRemove(blog) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Eliminazione Discussione: "' + blog.title + '"')
                .textContent('Vuoi davvero eliminarlo?')
                .ariaLabel(blog.id)
                .ok('OK')
                .cancel('ANNULLA');

            $mdDialog.show(confirm)
                .then(function () {
                    var id_blog = confirm._options.ariaLabel;
                    console.log("CANCELLA blog-->", id_blog);
                    deleteBlog(id_blog);
                }, function () {
                    $scope.status = 'You decided to keep your debt.';
                });
        };

        $scope.updateBlog = function (id, image, title,content, index_list) {



            var newImage = "";
            if (image == "" )
                newImage = $scope.resultBlogs[index_list].image;
            else{
                if(image != " ")
                    newImage = image;
            }


            var newContent = "";

            if (content == undefined)
                newContent = $scope.resultBlogs[index_list].content;
            else
                newContent = content;

            var newTitle = "";
            if (title == undefined)
                newTitle = $scope.resultBlogs[index_list].title;
            else
                newTitle = title;



            console.log("UPADate: "+id+"--"+newContent+"--"+newTitle+"--"+index_list);

            // // console.log("--->" + id + "----->" + newImage);
            // // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);
            //
            var payload = {
                id: id,
                image: newImage,
                title: newTitle,
                content: newContent
            };

            blogServices.updateBlog(payload).then(function (myReponseData) {
                $scope.getBlogs();
                showAlert("Modifica","Modifica effettuata!");
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

        $scope.removeImage = function(index){

            console.log("REm IMAGE--->",index);
            $scope.imageSrc[index]=" ";

        }

        $scope.showComments = function (ev, blog) {

            if(blog.n_comments>0){
                $mdDialog.show({
                    controller: DialogController,
                    locals: { blog: blog},
                    templateUrl: 'pagesServer/dialog-blog-comments.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (answer) {
                        // console.log("CLOSEEEE");
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        // if (type) {
                        //     angular.element(document.querySelector("#id_icon_" + type.id)).removeClass().addClass("fa " + type.icon);
                        // }
                    });
            }

        };

        function DialogController($scope, $mdDialog, blog) {



            $scope.blog = blog;

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function (icon) {
                // if (icon) {
                //     $scope.type.icon = icon;
                //     $mdDialog.cancel(type);
                // } else {
                    $mdDialog.cancel();

                // }

            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };

            // function chunk(arr, len) {
            //     var chunks = [],
            //         i = 0,
            //         n = arr.length;
            //     while (i < n) {
            //         chunks.push(arr.slice(i, i += len));
            //     }
            //     return chunks;
            // }

            // $scope.clickIcon = function (icon) {
            //
            //     console.log("ICON: " + icon);
            //     $scope.myIcon = icon;
            //     $scope.myStyle = {'color': 'red'};
            //     $scope.cancel($scope.myIcon);
            //
            // }
        }


    }
])

    .config(['uibDatepickerPopupConfig', function(uibDatepickerPopupConfig) {
        uibDatepickerPopupConfig.closeText = 'Chiudi';
        uibDatepickerPopupConfig.currentText = 'Oggi';
        uibDatepickerPopupConfig.clearText = 'Cancella';
    }])

    .directive('blogdiv', function($location,$anchorScroll,$http,$window,blogServices,$mdDialog) {
        return {
            scope: {
                counter: '='
            },
            templateUrl:'pagesServer/single_blog.html',
            controller: function($rootScope, $scope, $element) {

                $location.hash('bottomDiv');
                // // call $anchorScroll()
                $anchorScroll();

                $scope.localCounter = $scope.counter;

                $scope.removeDiv=function(counterToRemove){
                     // console.log("REM---"+counterToRemove);
                     console.log("counter centrale--->: "+$scope.counter+"----cremove"+counterToRemove);
                    // var myEle = angular.element( document.querySelector('#div_blog_' + counterToRemove ) );
                    // var myEl = angular.element(document.querySelector('#div_work_' + counterToRemove));
                    myEle.remove();   //removes element
                };

                $scope.setDate = function(year, month, day) {
                    $scope.dt = new Date(year, month, day);
                    // console.log("DATA-->",$scope.dt);
                };

                $scope.formats = ['dd-MMMM-yyyy, hh:mm', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.popup1 = {
                    opened: false
                };
                $scope.today = function() {
                    $scope.dt = new Date();
                };
                $scope.today();

                $scope.open1 = function() {
                    $scope.popup1.opened = true;
                };

                function isBlank(s){
                    return isEmpty(s.trim());
                }
                function isEmpty(s){
                    return !s.length;
                }

                $scope.addBlog=function(image,title,content,data){


                    if(title==undefined || content==undefined || (title!=undefined && isBlank(title)) || (content!=undefined && isBlank(content)))
                    {
                        showAlert("Errore", "Inserisci titolo e contenuto");
                    }
                    else
                    {
                        if(image == undefined)
                            image="";


                        var payload = {
                            image:image,
                            title: title,
                            content: content,
                            data:convertDate(data)
                        };

                        // console.log(payload);

                        blogServices.insertBlog(payload).then(function (myReponseData) {
                            showAlert("Inserimento", "Hai inserito un nuovo elemento con successo!");
                            // $window.location.reload();

                        });
                    }



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

                function convertDate(date){
                    var date_to_save="";
                    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
                    var d=date.getDate();
                    var m=months[date.getMonth()];
                    var y=date.getFullYear();
                    var h=date.getHours();
                    var mm=(date.getMinutes()<10?'0':'') + date.getMinutes();

                    date_to_save=d+"/"+m+"/"+y+","+h+":"+mm;
                    return date_to_save;
                }

            }
        }
    });


