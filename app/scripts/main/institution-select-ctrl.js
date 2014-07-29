'use strict';

Affordably.controller('InstitutionSelectCtrl', function ($scope, $famous, $state, $http, institutions) {
  var EventHandler = $famous['famous/core/EventHandler'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  require(['fuse/src/fuse.min'], function(Fuse) {

    var institutiondata;
    var data = institutions.query();

    data.$promise.then(function(data) {
    institutiondata = data;

    var options = {
      keys: ['institution_name']
    };

    var f = new Fuse(institutiondata, options);

    $scope.select = function(bank) {
      translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('link', {id: bank.intuit_inst_id});
      });
    };

    $scope.search = function (bank) {
      var result = f.search(bank);
      $scope.banks = result;
    };
  });

  var translateTrans = new Transitionable([0,0,0]);
  $scope.slide = translateTrans.get.bind(translateTrans);
  translateTrans.set([0,-568,0], {duration: 500, curve: 'easeOut'});
    });
  $scope.eventHandler = new EventHandler();

});