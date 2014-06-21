'use strict';

Affordably.controller('InstitutionsCtrl', function ($scope, $famous, $state) {
  var EventHandler = $famous['famous/core/EventHandler'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.getTranslate = translateTrans.get.bind(translateTrans);
  translateTrans.set([-287,0,0  ], {duration: 500, curve: 'easeOut'});
  $scope.eventHandler = new EventHandler();

  $scope.institutions = [{name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}];

  $scope.back = function () {
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('main');
    });
  };
});