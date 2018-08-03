angular.module('appServer').factory('aboutServices', function($http,addressServer){


    return{
        getDescription : function(){
            return $http.get(addressServer+'about/getDescription.php');
        },
        updateDescription : function(obj){
            return $http.post(addressServer+'about/updateDescription.php',obj);
        },
        getProfiles : function(){
            return $http.get(addressServer+'about/getProfiles.php');
        },
        insertProfile : function(obj){
            return $http.post(addressServer+'about/insertProfile.php',obj);
        },
        updateProfile : function(obj){
            return $http.post(addressServer+'about/updateProfile.php',obj);
        },
        deleteProfile : function(obj){
            return $http.post(addressServer+'about/deleteProfile.php',obj);
        },

    }
});