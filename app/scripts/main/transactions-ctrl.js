'use strict';

Affordably.controller('TransactionsCtrl', function ($scope, $famous, $state) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateT = new Transitionable([0,0,0]);
  var translateTra = new Transitionable([0,0,0]);

  $scope.getTranslating = translateT.get.bind(translateT);
  translateT.set([-window.innerWidth,0,0], {duration: 500, curve: 'easeOut'});

  $scope.getTranslatinger = translateTra.get.bind(translateTra);
  translateTra.set([-window.innerWidth,0,0], {duration: 500, curve: 'easeOut'});

  $scope.back = function (deferred) {
    $scope.getTranslating = translateT.get.bind(translateT);
    $scope.$emit('back');
    translateTra.set([0,0,0], {duration: 500, curve: 'easeOut'});
    translateT.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('main.menu');
    });
  };
});