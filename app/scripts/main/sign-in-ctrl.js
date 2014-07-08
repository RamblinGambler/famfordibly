'use strict';

Affordably.controller('SignInCtrl', function ($scope, $famous, $state, $http, $window) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);

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
          $scope.message = data.message;
      }
      else {
          $window.sessionStorage.token = data.token;
          console.log(data);
          translateTrans.set([-287, 0, 0  ], {duration: 500, curve: 'easeOut'}, function () {
              $state.go('goal');
          });
          $scope.message = 'Welcome';
      }
    }).error(function(data, status, headers, config) {
      delete $window.sessionStorage.token;
      $scope.message = 'Error: Invalid user or password';
    });
  };
});