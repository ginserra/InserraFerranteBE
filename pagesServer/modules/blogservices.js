angular.module('appServer').factory('blogServices', function($http,addressServer){


    return{
        getBlogs : function(){
            return $http.get(addressServer+'blog/getBlogs.php');
        },
        getComments : function(obj){
            return $http.post(addressServer+'blog/getComments.php',obj);
        },
        getDescription : function(){
            return $http.get(addressServer+'blog/getDescription.php');
        },
        updateDescription : function(obj){
            return $http.post(addressServer+'blog/updateDescription.php',obj);
        },
        updateBlog : function(obj){
            return $http.post(addressServer+'blog/updateBlog.php',obj);
        },
        insertBlog : function(obj){
            return $http.post(addressServer+'blog/insertBlog.php',obj);
        },
        deleteBlog : function(obj){
            return $http.post(addressServer+'blog/deleteBlog.php',obj);
        },
        getWorksFromType : function(obj){
            return $http.post(addressServer+'works/getWorksFromType.php',obj);
        }

    }
});