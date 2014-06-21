'use strict';

Affordably.controller('MenuCtrl', function ($scope, $famous, $state) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    //set things up
	    var translateTrans = new Transitionable([0,0,0]);
      translateTrans.set([287,0,0], {duration: 500, curve: 'easeOut'});

      $scope.getTranslated = translateTrans.get.bind(translateTrans);
    //now make things animate
    $scope.select = function () {
      translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'});
    };

    $scope.main = function() {
      translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('main')
      });
    };

    $scope.$on('back', function() {
      translateTrans.set([287,0,0], {duration: 500, curve: 'easeOut'});
    });


  });