'use strict';

Affordably.controller('SignInCtrl', function ($scope, $famous, $state, $http, $window, flash) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var EventHandler = $famous['famous/core/EventHandler'];
  $scope.eventHandler = new EventHandler();
  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);
  $scope.showError = false;
  $scope.hideError = true;


  // $scope.scroll = function () {
  //   translateTrans.set([0,-167,0], {duration: 500, curve: 'easeOut'});
  // };

  $scope.signUp = function() {
    $state.go('signUp');
  };

  $scope.scrollBack = function () {
    // translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'});
    $window.scrollTo(0, 0);
  };

  $scope.submit = function(email, password) {
    var credentials = {
      password: password,
      user_email: email
    };

    $http({
      method: 'POST',
      url: 'https://guavaplan-staging.herokuapp.com/api/v1/tokens',
      data: credentials
    }).success(function(data) {
      if (data.message){
          delete $window.sessionStorage.token;
          flash.error = data.message;
          $scope.showError = true;
          $scope.hideError = false;
      }
      else {
          $window.sessionStorage.token = data.token;
          if (data.account === 0){
              translateTrans.set([-287, 0, 0  ], {duration: 500, curve: 'easeOut'}, function () {
                  $state.go('goal');
              });
          } else {
              translateTrans.set([-287, 0, 0  ], {duration: 500, curve: 'easeOut'}, function () {
                  $state.go('main');
              });
          }
          flash.success = 'Welcome back!';
          $scope.alert = 'error-alert-show';
      }
    }).error(function(data) {
      delete $window.sessionStorage.token;
        flash.error = data.message;
        $scope.showError = true;
        $scope.hideError = false;
        $state.go('signUp');
    });
  };
});