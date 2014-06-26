'use strict';

Affordably.controller('SignInCtrl', function ($scope, $famous, $state, $http, Auth) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.getTranslate = translateTrans.get.bind(translateTrans);
  translateTrans.set([-287,0,0  ], {duration: 500, curve: 'easeOut'});

  // var password = $scope.password;
  // var email = $scope.email;

  $scope.submit = function(email, password) {
    var credentials = {
      password: password,
      user_email: email
    };

    console.log(credentials);

    $http({
      method: 'POST',
      url:"http://localhost:3000/api/v1/tokens/new",
      data: credentials
    }).success(function(data, status, headers, config) {
      console.log(data)
    }).error(function(data, status, headers, config) {
      console.log(data)
    });
  };
});