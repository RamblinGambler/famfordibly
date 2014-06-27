'use strict';

Affordably.controller('SignUpCtrl', function ($scope, $famous, $state, $http) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.getTranslate = translateTrans.get.bind(translateTrans);
  translateTrans.set([-287,0,0  ], {duration: 500, curve: 'easeOut'});

  var credentials = {
    username: $scope.username,
    email: $scope.email
  };


  $scope.submit = function() {
    // Auth.register(credentials).then(function (user) {
      // console.log(user);
    // });
  };
});