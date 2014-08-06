'use strict';

Affordably.controller('FinancesCtrl', ['$scope', '$famous', '$state', '$filter', '$http', '$window', 'mainData',function ($scope, $famous, $state, $filter, $http, $window, mainData) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateT = new Transitionable([0,0,0]);
  var translateTr = new Transitionable([0,0,0]);

  $scope.getTranslating = translateT.get.bind(translateT);
    translateT.set([0,-window.innerHeight+20,1], {duration: 500, curve: 'easeOut'});

  $scope.getTranslater = translateTr.get.bind(translateTr);
    translateTr.set([-window.innerWidth,0,0], {duration: 500, curve: 'easeOut'});

  $scope.data = {
    finances: mainData.data.finances
  };
  console.log($scope.data);

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
      method: 'PUT',
      url: 'https://guavaplan-staging.herokuapp.com/api/v1/finances',
      params: {
        income: income,
        monthly_fixed: fixed,
        money_leftover: leftover,
        auth_token: $window.sessionStorage.token
      }
    }).success(function() {
      $scope.message = 'Your finances have been saved';
    }).error(function() {
    });
  };

  }]);