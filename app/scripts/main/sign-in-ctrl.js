'use strict';

Affordably.controller('SignInCtrl', function ($scope, $famous, $state, $http, $window, flash) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var EventHandler = $famous['famous/core/EventHandler'];
  $scope.eventHandler = new EventHandler();
  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);
  $scope.showError = false;
  $scope.hideError = true;

  $scope.submit = function(email, password) {
    var credentials = {
      password: password,
      user_email: email
    };

    $http({
      method: 'POST',
      url: "https://guavaplan-staging.herokuapp.com/api/v1/tokens",
      data: credentials
    }).success(function(data, status, headers, config) {
      if (data.message){
          delete $window.sessionStorage.token;
          flash.error = data.message;
          $scope.showError = true;
          $scope.hideError = false;
      }
      else {
          $window.sessionStorage.token = data.token;
          translateTrans.set([-287, 0, 0  ], {duration: 500, curve: 'easeOut'}, function () {
              $state.go('goal');
          });
          flash.success = 'Welcome back!';
          $scope.alert = 'error-alert-show';
      }
    }).error(function(data, status, headers, config) {
      delete $window.sessionStorage.token;
      flash.error = data.message;
        $scope.showError = true;
        $scope.hideError = false;
    });
  };
});