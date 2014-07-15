'use strict';

var signUp = Affordably.controller('SignUpCtrl', function ($scope, $famous, $state, $http, $window, flash) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var EventHandler = $famous['famous/core/EventHandler'];
    $scope.eventHandler = new EventHandler();
    var translateTrans = new Transitionable([0,0,0]);
    $scope.success = translateTrans.get.bind(translateTrans);

    $scope.scroll = function () {
      console.log("EFWRGAETRYT");
      translateTrans.set([0,-167,0], {duration: 500, curve: 'easeOut'});
    };

    $scope.scrollBack = function () {
      console.log("EFWRGAETRYT");
      translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'});
    };

    $scope.submit = function(email, password, passwordConfirm) {
        var credentials = {
            password: password,
            password_confirmation: passwordConfirm,
            user_email: email
        };

        $http({
            method: 'POST',
            url: "https://guavaplan-staging.herokuapp.com/api/v1/tokens/new",
            data: credentials
        }).success(function(data, status, headers, config) {
            if (data.message){
                delete $window.sessionStorage.token;
                flash.error = data.message;
            }
            else {
                $window.sessionStorage.token = data.token;
                console.log(data);
                translateTrans.set([-287, 0, 0  ], {duration: 500, curve: 'easeOut'}, function () {
                    $state.go('goal');
                });
                flash.success = 'Welcome back!';
            }
        }).error(function(data, status, headers, config) {
            delete $window.sessionStorage.token;
            flash.error = data.message;
        });
    };
});

signUp.$inject = ['flash'];