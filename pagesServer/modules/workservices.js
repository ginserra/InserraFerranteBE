angular.module('appServer').factory('workServices', function($http,addressServer){


    return{
        getWorks : function(){
            return $http.get(addressServer+'works/getWorks.php');
        },
        getWorksType : function(){
            return $http.get(addressServer+'works/getWorksType.php');
        },
        getAllWorksType : function(){
            return $http.get(addressServer+'works/getAllWorksType.php');
        },
        getDescription : function(){
            return $http.get(addressServer+'works/getDescription.php');
        },
        updateDescription : function(obj){
            return $http.post(addressServer+'works/updateDescription.php',obj);
        },

        updateWorksType : function(obj){
            return $http.post(addressServer+'works/updateWorksType.php',obj);
        },
        deleteWorkType : function(obj){
            return $http.post(addressServer+'works/deleteWorkType.php',obj);
        },
        updateWork : function(obj){
            return $http.post(addressServer+'works/updateWork.php',obj);
        },
        insertWork : function(obj){
            return $http.post(addressServer+'works/insertWork.php',obj);
        },
        deleteWork : function(obj){
            return $http.post(addressServer+'works/deleteWork.php',obj);
        },
        getWorksFromType : function(obj){
            return $http.post(addressServer+'works/getWorksFromType.php',obj);
        }

    }
});