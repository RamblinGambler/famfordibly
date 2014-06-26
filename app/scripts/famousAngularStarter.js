'use strict';

var Affordably = angular.module('famousAngularStarter',
  ['ngAnimate', 'ngCookies',
    'ngTouch', 'ngSanitize',
    'ngResource', 'ui.router',
    'famous.angular', 'Devise']);

Affordably.config(function(AuthProvider) {

  // Customise register
  AuthProvider.registerMethod('POST');
  AuthProvider.registerPath('http://localhost:3000/api/v1/tokens/new');
});

Affordably.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('signIn', {
    url: '/',
    templateUrl: 'partials/sign-in.html',
    controller: 'SignInCtrl',
  })
  .state('signUp', {
    url: '/sign-up',
    templateUrl: 'partials/sign-up.html',
    controller: 'SignUpCtrl',
  })

  .state('main', {
    url: '/main',
    templateUrl: 'partials/main.html',
    controller: 'MainCtrl',
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

  $urlRouterProvider.otherwise('/');
});