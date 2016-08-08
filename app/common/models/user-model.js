  'use strict';

  angular.module('tangent.common')
  .service('UserModel', function ($http,$rootScope,$cookies) {
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
                 $cookies.put('token',response.token);
                
               })
      .error(function (error) {
        currentUser = null;
        console.error('Authentication failed:', error);
      });
    };
  });
