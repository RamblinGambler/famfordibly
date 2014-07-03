'use strict';

Affordably.controller('TransactionsCtrl', function ($scope, $famous, $state, $injector, $q, $resolve, mainData) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var EventHandler = $famous['famous/core/EventHandler'];

  var translateT = new Transitionable([0,0,0]);

  // $scope.data = {
  //   user: 'Loading...',
  //   message: "",
  //   time_remaining: "",
  //   daily_cash: "",
  //   total_available: "",
  //   daily_spent: "",
  //   fixed_left: "",
  //   money_leftover: "",
  //   saved: "",
  //   users_daily: "",
  //   outgoings: [],
  //   incomings: [],
  //   settings: {},
  //   income: "",
  //   housing: "",
  //   banking: {},
  //   monthly_fixed: ""
  // }

  // var data = mainData.loadMain();
  // data.then(function(data) {
  //   $scope.data.outgoings = data.data.outgoings;
  //   $scope.data.incomings = data.data.incomings;
  //   // $scope.data.user = data.data.user;
  //   // $scope.data.users_daily = data.data.users_daily;
  //   // $scope.data.message = data.data.message;
  //   // $scope.data.time_remaining = data.data.time_remaining;
  //   // $scope.data.daily_cash = data.data.daily_cash;
  //   // $scope.data.total_available = 0;
  //   // $scope.data.daily_spent = data.data.daily_spent;
  //   // $scope.data.fixed_left = data.data.fixed_left;
  //   // $scope.data.money_leftover = data.data.money_leftover;
  //   // $scope.data.settings = data.data.settings;
  //   // $scope.data.saved = data.data.saved;
  //   // $scope.data.income = Math.round(data.data.income);
  //   // $scope.data.housing = Math.round(data.data.housing);
  //   // $scope.data.banking = data.data.banking;
  //   // $scope.data.monthly_fixed = data.data.monthly_fixed;
  //   // for (var i = 0; i < data.data.banking.bank.length; i++) {
  //   //   if (data.data.banking.bank[i].primary === true) {
  //   //     $scope.data.total_available += data.data.banking.bank[i].balance
  //   //   };
  //   // };
  // });


  $scope.back = function (deferred) {
      $scope.getTranslating = translateT.get.bind(translateT);
      $scope.$emit('back');
      translateT.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
          $state.go('main.menu');
      });
  };

  $scope.getTranslating = translateT.get.bind(translateT);
  translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});

  // $scope.transactions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


});