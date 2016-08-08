'use strict';

angular.module('tangent.common')
  .service('ProjectsModel', function ($http, UserModel,$rootScope,$cookies) {
    var service = this;
    var token = $cookies.get('token');
    console.log(token);
    $http.defaults.headers.common['Authorization'] = token; // neeed to set cookies for page refreeshes
    var ProjectsEndPoint = 'http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/';

    function extract(result) {
      console.log(result);
      return result.data;
    }

    service.all = function () {
      return $http.get(ProjectsEndPoint,{headers: {'Content-Type':'application/json'}})
      .then(extract);
    };

    service.create = function (project) {
      console.log(project);
      return $http.post(ProjectsEndPoint,project,{headers: {'Content-Type':'application/json'}})
      .then(extract);
    };

    service.update = function (projectId, project) {
        return $http.put(ProjectsEndPoint+ projectId+'/',project,{headers: {'Content-Type':'application/json'}})
        .then(extract);
    };

    service.destroy = function (projectId) {
       return $http.delete(ProjectsEndPoint+ projectId+'/',{headers: {'Content-Type':'application/json'}})
       .then(extract);
    };
  });