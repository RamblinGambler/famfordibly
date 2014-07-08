'use strict';

Affordably.controller('GoalCtrl', function ($scope, $famous, $state, mainData, $window, $http) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var EventHandler = $famous['famous/core/EventHandler'];

  var translateT = new Transitionable([0,0,0]);
  var translateTr = new Transitionable([0,0,0]);


  $scope.submit = function (goal) {
    console.log(goal);
    $http({
      method: 'POST',
      url: "https://guavaplan-staging.herokuapp.com/api/v1/goal",
      params: {goal: goal, auth_token: $window.sessionStorage.token}
    }).success(function(data) {
      $state.go('institutionSelect')
    }).error(function(error) {
      console.log(error);
    });
  };

  $scope.getTranslating = translateT.get.bind(translateT);
  translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});
  $scope.getTranslater = translateTr.get.bind(translateTr);
  translateTr.set([-320,0,0], {duration: 500, curve: 'easeOut'});
});