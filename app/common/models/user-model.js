  'use strict';

  angular.module('tangent.common')
  .service('UserModel', function ($http,$rootScope) {
    var service = this,
    currentUser = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };

    service.login = function (user) {
      console.log(user);
      return $http.post('http://userservice.staging.tangentmicroservices.com:80/api-token-auth/', { username: user.username, password: user.password })
      .success(function (response) {
                 $http.defaults.headers.common['Authorization'] = response.token; // neeed to set cookies for page refreeshes
               })
      .error(function (error) {
        currentUser = null;
        console.error('Authentication failed:', error);
      });
    };
  });
