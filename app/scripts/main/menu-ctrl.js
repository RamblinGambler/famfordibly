'use strict';

Affordably.controller('MenuCtrl', function ($scope, $famous, $state) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  //set things up
  var translateTrans = new Transitionable([0,0,0]);
  var translateTranny = new Transitionable([0,0,0]);
  translateTrans.set([287,0,0], {duration: 500, curve: 'easeOut'});
  translateTranny.set([0,0,0]);

  $scope.getTranslated = translateTrans.get.bind(translateTrans);
  $scope.getTranslater = translateTranny.get.bind(translateTranny);
  $(".mainContainer").addClass("faded");

  $scope.select = function () {
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'});
  };

  $scope.main = function($event) {
  translateTranny.set([50,0,0]);
    $(".mainContainer").removeClass("faded");
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
      $state.go('main')
    });
  };

    $scope.backToMain = function() {
      $state.go('main');
    };


  $scope.$on('back', function() {
    translateTrans.set([287,0,0], {duration: 500, curve: 'easeOut'});
  });


  });