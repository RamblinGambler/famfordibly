'use strict';

Affordably.controller('SettingsCtrl', ['$scope', '$famous', '$state', '$window', '$http', 'mainData',function ($scope, $famous, $state, $window, $http, mainData) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateT = new Transitionable([0,0,0]);
  $scope.getTranslating = translateT.get.bind(translateT);
  translateT.set([0,-window.innerHeight+20,1], {duration: 500, curve: 'easeOut'});

  var translateTr = new Transitionable([0,0,0]);
  $scope.getTranslater = translateTr.get.bind(translateTr);
  translateTr.set([-window.innerWidth,0,0], {duration: 500, curve: 'easeOut'});

  $scope.data = {
    settings: mainData.data.settings
  };

  $scope.back = function () {
      $scope.getTranslating = translateT.get.bind(translateT);
      $scope.$emit('back');
      translateTr.set([0,0,0], {duration: 500, curve: 'easeOut'});
      translateT.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
          $state.go('main.menu');
      });
  };




  $scope.logOut = function() {
    $http({
      method: 'DELETE',
      url: 'https://guavaplan-staging.herokuapp.com/api/v1/tokens',
      params: {
        id: $window.sessionStorage.token
      }
    }).success(function() {
      $state.go('signIn');
    }).error(function() {
    });
  };

  $scope.save = function(weekly, daily, phone) {

    $http({
      method: 'PUT',
      url: 'https://guavaplan-staging.herokuapp.com/api/v1/settings',
      params: {
        weekly: weekly,
        daily: daily,
        phone_num: phone,
        auth_token: $window.sessionStorage.token
      }
    }).success(function() {
      $scope.warn = true;
      $scope.message = 'Your settings have been saved';
    }).error(function() {
    });
  };
 }]);