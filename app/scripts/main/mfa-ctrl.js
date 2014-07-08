'use strict';

Affordably.controller('MfaCtrl', function ($scope, $famous, $state, $http, $window, $stateParams) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);
  $scope.data = $stateParams;

  console.log($scope.data.type)
  $scope.submit = function(choice) {
    console.log(choice);
  };
});