'use strict';

angular.module('tangent')
  .controller('LoginCtrl', function (UserModel, $state) {
    var login = this;

    login.loading = false;

    login.user = {
      username: '',
      password: ''
    };

    function onLogin() {
      UserModel.login({
          username: login.user.username,
          password: login.user.password
      })
      .then(onSuccess)
      .catch(onError)
      .finally(onCompletion);
    }

    function onSuccess(result) {
      $state.go('projects');
    }

    function onError(reason) {
        login.error = 'Unable to login with the provided credentials. Please try again';
    }

    function onCompletion() {
      login.reset();
    }

    login.submit = function (user, isValid) {
      if (isValid) {
        login.loading = true;
          onLogin();
      }
    };

    login.reset = function () {
      login.loading = false;
      login.user = {
        email: '',
        password: ''
      };
    };
  });
