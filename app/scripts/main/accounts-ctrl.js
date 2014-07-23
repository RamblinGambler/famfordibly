'use strict';

Affordably.controller('AccountsCtrl', function ($scope, $famous, $state) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateT = new Transitionable([0,0,0]);
  var translateTr = new Transitionable([0,0,0]);


  $scope.back = function () {
    $scope.getTranslating = translateT.get.bind(translateT);
    $scope.$emit('back');
    translateTr.set([0,0,0], {duration: 500, curve: 'easeOut'});
    translateT.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('main.menu');
    });
  };

  $scope.getTranslating = translateT.get.bind(translateT);
  translateT.set([0,-window.innerHeight,1], {duration: 500, curve: 'easeOut'});
  $scope.getTranslater = translateTr.get.bind(translateTr);
  translateTr.set([-window.innerWidth,0,0], {duration: 500, curve: 'easeOut'});
});