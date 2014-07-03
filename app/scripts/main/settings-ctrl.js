'use strict';

Affordably.controller('SettingsCtrl', function ($scope, $famous, $state, $window, $http) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var EventHandler = $famous['famous/core/EventHandler'];

  var translateT = new Transitionable([0,0,0]);

  $scope.back = function (deferred) {
      $scope.getTranslating = translateT.get.bind(translateT);
      $scope.$emit('back');
      translateT.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
          $state.go('main.menu');
      });
  };


  $scope.data = {
    settings: {}
  };

  // var data = mainData.loadMain();
  // data.then(function(data) {
    //     $scope.data.outgoings = data.data.outgoings;
    //     $scope.data.incomings = data.data.incomings;
    //     $scope.data.user = data.data.user;
    //     $scope.data.users_daily = data.data.users_daily;
    //     $scope.data.message = data.data.message;
    //     $scope.data.time_remaining = data.data.time_remaining;
    //     $scope.data.daily_cash = data.data.daily_cash;
    //     $scope.data.total_available = 0;
    //     $scope.data.daily_spent = data.data.daily_spent;
    //     $scope.data.fixed_left = data.data.fixed_left;
    //     $scope.data.money_leftover = data.data.money_leftover;
        // $scope.data.settings = data.data.settings;
    //     $scope.data.saved = data.data.saved;
    //     $scope.data.income = data.data.income);
    //     $scope.data.housing = data.data.housing);
    //     $scope.data.banking = data.data.banking;
    //     $scope.data.monthly_fixed = data.data.monthly_fixed;
    //     for (var i = 0; i < data.data.banking.bank.length; i++) {
    //       if (data.data.banking.bank[i].primary === true) {
    //         $scope.data.total_available += data.data.banking.bank[i].balance
    //       };
    //     };

    // console.log($scope.data.settings)

    $scope.save = function(weekly, daily, phone) {
      console.log(weekly);
      console.log(daily);
      console.log(phone);

      $http({
        method: 'PUT',
        url: 'http://localhost:3000/api/v1/settings',
        params: {
          weekly: weekly,
          daily: daily,
          phone_num: phone,
          auth_token: $window.sessionStorage.token
        }
      }).success(function(data) {
        console.log(data);
        $scope.message = "Your settings have been saved"
      }).error(function(error) {
        console.log(error)
      });
    };
  // });

  $scope.getTranslating = translateT.get.bind(translateT);
    translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});

 });