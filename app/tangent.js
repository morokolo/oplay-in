'use strict';

angular.module('tangent', [
  'ui.router',
  'ngAnimate',
  'tangent.common'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login-template.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('projects', {
        url:'/projects',
        templateUrl: 'app/projects/projects-template.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'ctrl'
      });
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
;
