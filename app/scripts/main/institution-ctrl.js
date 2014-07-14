'use strict';

Affordably.controller('InstitutionCtrl', function ($scope, $famous, $state, $filter, $http,
  $window) {

  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);

  $scope.show = translateTrans.get.bind(translateTrans);
  translateTrans.set([0,275,0], {duration: 500, curve: 'easeOut'});


  $scope.select = function(bank) {

      translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('link', {id: bank.intuit_inst_id});
      });
  };
});