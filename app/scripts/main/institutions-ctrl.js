'use strict';

Affordably.controller('InstitutionsCtrl', function ($scope, $famous, $state, $http, institutions) {
  var EventHandler = $famous['famous/core/EventHandler'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  var translateTranny = new Transitionable([0,0,0]);
  var translateTran = new Transitionable([0,0,0]);
  var translateTransy = new Transitionable([0,0,0]);

  $scope.getTranslater = translateTranny.get.bind(translateTranny);
  $scope.getTranslate = translateTrans.get.bind(translateTrans);
  $scope.getTranslating = translateTran.get.bind(translateTran);
  $scope.show = translateTransy.get.bind(translateTransy);


  translateTranny.set([0,0,0]);
  translateTrans.set([-287,0,0], {duration: 500, curve: 'easeOut'});
  translateTran.set([-287,0,1], {duration: 500, curve: 'easeOut'});
  $(".mainContainer").addClass("faded");
  $scope.eventHandler = new EventHandler();

  require(["fuse/src/fuse.min"], function(Fuse) {

    var institutiondata;
    var data = institutions.query();

    data.$promise.then(function(data) {
      institutiondata = data;

      var options = {
        keys: ['institution_name']
      };

      var f = new Fuse(institutiondata, options);

      $scope.search = function (bank) {
        var result = f.search(bank);
        $scope.institutions = result;
        $scope.$broadcast('bankChange', result);
        translateTransy.set([0,275,0], {duration: 500, curve: 'easeOut'});
      }
    });
  });

  $scope.select = function(bank) {
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
      $state.go('link', {id: bank.intuit_inst_id});
    });
  };



  $scope.back = function () {
    translateTranny.set([-80,0,0]);
    $(".mainContainer").removeClass("faded");
    translateTran.set([0,0,0], {duration: 500, curve: 'easeOut'});
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('main');
    });
  };
});