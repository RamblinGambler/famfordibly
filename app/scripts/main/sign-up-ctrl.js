'use strict';

var signUp = Affordably.controller('SignUpCtrl', function ($scope, $famous, $state, $http, $window, flash) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var EventHandler = $famous['famous/core/EventHandler'];
    $scope.eventHandler = new EventHandler();
    var translateTrans = new Transitionable([0,0,0]);
    $scope.success = translateTrans.get.bind(translateTrans);

    $scope.spin = false;
    // $scope.scroll = function () {
    //   translateTrans.set([0,-167,0], {duration: 500, curve: 'easeOut'});
    // };
    var firstPass;
    $scope.check = function(password) {
      if(password.length < 8) {
        $scope.message = 'Passwords must be at least 8 characters long';
      } else {
        $scope.message = '';
      }
      firstPass = password
    }

    $scope.checkConfirm = function(password) {
      if (password != firstPass) {
        $scope.message = 'Passwords do not match';
      } else {
        $scope.message = '';
      }
    }

    // $scope.scrollBack = function () {
    //   translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'});
    // };

    $scope.submit = function(email, password, passwordConfirm) {
        $scope.spin = true;
        var credentials = {
            password: password,
            password_confirmation: passwordConfirm,
            user_email: email
        };

        $http({
            method: 'POST',
            url: 'https://guavaplan-staging.herokuapp.com/api/v1/tokens/new',
            data: credentials
        }).success(function(data) {
            if (data.message){
                delete $window.sessionStorage.token;
                flash.error = data.message;
                $scope.spin = false;
            }
            else {
                $window.sessionStorage.token = data.token;
                translateTrans.set([-287, 0, 0  ], {duration: 500, curve: 'easeOut'}, function () {
                    $state.go('goal');
                });
                flash.success = 'Welcome back!';
            }
        }).error(function(data) {
            delete $window.sessionStorage.token;
            flash.error = data.message;
            $scope.spin = false;
        });
    };
});

signUp.$inject = ['flash'];