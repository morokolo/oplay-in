'use strict';

angular.module('tangent', [
  'ui.router',
  'ngAnimate',
  'tangent.common',
  'ngCookies'
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



  .run(['$rootScope', '$location', '$cookies', '$http',
    function ($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
     	
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            var token = $cookies.get('token');
     		console.log(token);
            if ($location.path() !== '/login' && token === undefined || token ==null) {
                $location.path('/login');
            }else{
            	 $location.path('/projects');
            }
        });
    }])
;
