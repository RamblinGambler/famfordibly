'use strict';

Affordably.controller('GoalCtrl', function ($scope, $famous, $state, mainData, $window, $http) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateT = new Transitionable([0,0,0]);
  var translateTr = new Transitionable([0,0,0]);
  $scope.spin = false;


  $scope.submit = function (goal) {
    $scope.spin = true;
    if (isNaN(goal)) {
      $scope.spin = false;
      $scope.message = "Please enter a number to continue."
    } else {
      $http({
        method: 'POST',
        url: 'https://affordably.me/api/v1/goal',
        params: {goal: goal, auth_token: $window.sessionStorage.token}
      }).success(function() {
        $scope.spin = false;
        $state.go('institutionSelect');
      }).error(function() {
        $scope.spin = false;
      });
    }
  };

  $scope.getTranslating = translateT.get.bind(translateT);
  translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});
  $scope.getTranslater = translateTr.get.bind(translateTr);
  translateTr.set([-320,0,0], {duration: 500, curve: 'easeOut'});
});