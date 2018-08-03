angular.module('appServer').factory('homeServices', function($http,addressServer){


    return{
        getDescriptions : function(){
            return $http.get(addressServer+'home/getDescriptions.php');
        },
        updateDescription : function(obj){
            return $http.post(addressServer+'home/updateDescription.php',obj);
        }


    }
});
