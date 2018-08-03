angular.module('appServer').controller('homeController',['$scope','$http','homeServices', function($scope,$http,homeServices) {

    $scope.resultDescriptions=[];
    getDescriptions();
    getCount("/img/bgslides/");

    $scope.saveDescription = function(type){

        var description = "";
        var subdescription = "";
        var id=0;

        if(type == 1){
            description = $scope.desc1;
            subdescription = $scope.minidesc1;
            id=resultDescriptions[0].id;
        }
        if(type == 2){
            description = $scope.desc2;
            subdescription = $scope.minidesc2;
            id=resultDescriptions[1].id;
        }
        if(type == 3){
            description = $scope.desc3;
            subdescription = $scope.minidesc3;
            id=resultDescriptions[2].id;
        }

        var payload = {
            id:id,
            type:type,
            description:description,
            subdescription:subdescription
        };

        homeServices.updateDescription(payload).then(function (myReponseData) {
            getDescriptions();


        });

    }

    function getDescriptions() {
        homeServices.getDescriptions().then(function(myReponseData){
            // var data = myReponseData.data;

            var result = myReponseData.data;
            resultDescriptions = result;
            for(var i =0;i<result.length;i++){
                var row = result[i];
                if(row.type == 1){
                    $scope.desc1 = row.description;
                    $scope.minidesc1=row.subdescription;
                }
                if(row.type == 2){
                    $scope.desc2 = row.description;
                    $scope.minidesc2=row.subdescription;
                }
                if(row.type == 3){
                    $scope.desc3 = row.description;
                    $scope.minidesc3=row.subdescription;
                }
            }

        });
    }

    function getCount(foldername)
    {

    }


}]);