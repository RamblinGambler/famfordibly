'use strict';

var Affordably = angular.module('famousAngularStarter',
  ['ngAnimate', 'ngCookies',
    'ngTouch', 'ngSanitize',
    'ngResource', 'ui.router',
    'famous.angular', 'angles','angular-flash.service',
    'angular-flash.flash-alert-directive']);

Affordably.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
  .state('signIn', {
    url: '/',
    templateUrl: 'partials/sign-in.html',
    controller: 'SignInCtrl'
  })
  .state('signUp', {
    url: '/sign-up',
    templateUrl: 'partials/sign-up.html',
    controller: 'SignUpCtrl'
  })
  .state('goal', {
    url: '/goal',
    templateUrl: 'partials/goal.html',
    controller: 'GoalCtrl'
  })
  .state('institutionSelect', {
    url: '/institution-select',
    templateUrl: 'partials/institution-select.html',
    controller: 'InstitutionSelectCtrl'
  })
  .state('link', {
    url: '/link/:id',
    templateUrl: 'partials/account-link.html',
    controller: 'LinkCtrl'
  })
  .state('wait', {
    url: '/wait/:job',
    templateUrl: 'partials/wait.html',
    controller: 'WaitCtrl'
  })
  .state('mfa', {
    url: '/mfa/:type/:text/:inst/:challenge/:session/:image/:choice1/:choice2/:choice3',
    templateUrl: 'partials/mfa.html',
    controller: 'MfaCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'partials/main.html',
    controller: 'MainCtrl'
  })

      .state('main.institutions', {
        url: '/institutions',
        templateUrl: 'partials/main.institutions.html',
        controller: 'InstitutionsCtrl'
      })
      .state('main.menu', {
        url: '/menu',
        templateUrl: 'partials/main.menu.html',
        controller: 'MenuCtrl'
      })

      .state('main.menu.transactions', {
        url: '/transactions',
        templateUrl: 'partials/main.menu.transactions.html',
        controller: 'TransactionsCtrl'
      })

      .state('main.menu.finances', {
        url: '/finances',
        templateUrl: 'partials/main.menu.finances.html',
        controller: 'FinancesCtrl'
      })

      .state('main.menu.accounts', {
        url: '/accounts',
        templateUrl: 'partials/main.menu.accounts.html',
        controller: 'AccountsCtrl'
      })

      .state('main.menu.settings', {
        url: '/settings',
        templateUrl: 'partials/main.menu.settings.html',
        controller: 'SettingsCtrl'
      });

  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
        function success(response) {
            return response
        };

        function error(response) {
            if (response.status == 401) {
                $rootScope.$broadcast('event:unauthorized');
                $location.path('/users/login');
                return response;
            };
            return $q.reject(response);
        };

        return function(promise) {
            return promise.then(success, error);
        };
    }];

  $httpProvider.responseInterceptors.push(interceptor);


  $urlRouterProvider.otherwise('/');
});