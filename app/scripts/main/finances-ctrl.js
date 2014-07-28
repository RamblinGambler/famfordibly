'use strict';

Affordably.controller('FinancesCtrl', function ($scope, $famous, $state, $filter, $http, $window) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateT = new Transitionable([0,0,0]);
  var translateTr = new Transitionable([0,0,0]);

  $scope.getTranslating = translateT.get.bind(translateT);
    translateT.set([0,-window.innerHeight,1], {duration: 500, curve: 'easeOut'});

  $scope.getTranslater = translateTr.get.bind(translateTr);
    translateTr.set([-window.innerWidth,0,0], {duration: 500, curve: 'easeOut'});

  $scope.back = function () {
      $scope.getTranslating = translateT.get.bind(translateT);
      $scope.$emit('back');
      translateTr.set([0,0,0], {duration: 500, curve: 'easeOut'});
      translateT.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
          $state.go('main.menu');
      });
  };

  $scope.save = function(leftover, income, fixed) {
    $http({
      method: 'POST',
      url: 'https://affordably.me/api/v1/finances',
      params: {
        income: income,
        monthly_fixed: fixed,
        money_leftover: leftover,
        auth_token: $window.sessionStorage.token
      }
    }).success(function(data) {
      console.log(data);
      $scope.message = 'Your finances have been saved';
    }).error(function() {
    });
  };

  });