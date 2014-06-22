'use strict';

Affordably.controller('InstitutionsCtrl', function ($scope, $famous, $state) {
  var EventHandler = $famous['famous/core/EventHandler'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  var translateTranny = new Transitionable([0,0,0]);

  $scope.getTranslater = translateTranny.get.bind(translateTranny);
  $scope.getTranslate = translateTrans.get.bind(translateTrans);


  translateTranny.set([0,0,0]);
  translateTrans.set([-287,0,0  ], {duration: 500, curve: 'easeOut'});
  $scope.eventHandler = new EventHandler();

  $scope.institutions = [{name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}];

  $scope.back = function () {
  translateTranny.set([-50,0,0]);
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('main');
    });
  };
});