angular.module('appServer').factory('servicesServices', function($http,addressServer){


    return{
        getDescription : function(){
            return $http.get(addressServer+'services/getDescription.php');
        },
        updateDescription : function(obj){
            return $http.post(addressServer+'services/updateDescription.php',obj);
        },
        getServices : function(){
            return $http.get(addressServer+'services/getServices.php');
        },
        updateService : function(obj){
            return $http.post(addressServer+'services/updateService.php',obj);
        },
        insertServices : function(obj){
            return $http.post(addressServer+'services/insertService.php',obj);
        },
        deleteService : function(obj){
            return $http.post(addressServer+'services/deleteService.php',obj);
        },

    }
});