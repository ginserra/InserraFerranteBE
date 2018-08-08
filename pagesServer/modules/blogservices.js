angular.module('appServer').factory('blogServices', function($http,addressServer){


    return{
        getBlogs : function(){
            return $http.get(addressServer+'blog/getBlogs.php');
        },
        getComments : function(obj){
            return $http.post(addressServer+'blog/getComments.php',obj);
        },
        getAllWorksType : function(){
            return $http.get(addressServer+'works/getAllWorksType.php');
        },
        getDescription : function(){
            return $http.get(addressServer+'blog/getDescription.php');
        },
        updateDescription : function(obj){
            return $http.post(addressServer+'blog/updateDescription.php',obj);
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
        insertBlog : function(obj){
            return $http.post(addressServer+'blog/insertBlog.php',obj);
        },
        deleteWork : function(obj){
            return $http.post(addressServer+'works/deleteWork.php',obj);
        },
        getWorksFromType : function(obj){
            return $http.post(addressServer+'works/getWorksFromType.php',obj);
        }

    }
});