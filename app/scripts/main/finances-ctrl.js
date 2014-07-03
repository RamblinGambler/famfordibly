'use strict';

Affordably.controller('FinancesCtrl', function ($scope, $famous, $state, $filter) {
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

  $scope.save = function(leftover, income, fixed) {
    // POST TO PROFILE
    console.log(leftover);
    console.log(income);
    console.log(fixed);
  };

  $scope.getTranslating = translateT.get.bind(translateT);
    translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});

  $scope.transactions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  });