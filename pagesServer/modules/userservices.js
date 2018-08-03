angular.module('appServer').factory('userServices', function($http,addressServer){


    return{

        insertUser : function(obj){
            return $http.post(addressServer+'users/insertUser.php',obj);
        },
        getProfiles : function(){
            return $http.get(addressServer+'about/getProfiles.php');
        },
        loginUser : function(obj){
            return $http.post(addressServer+'users/loginUser.php',obj);
        },
        updateProfile : function(obj){
            return $http.post(addressServer+'about/updateProfile.php',obj);
        },
        deleteProfile : function(obj){
            return $http.post(addressServer+'about/deleteProfile.php',obj);
        },

    }
});