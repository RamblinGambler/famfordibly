'use strict';

Affordably.controller('MenuCtrl', function ($scope, $famous, $state) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  //set things up
  var translateTrans = new Transitionable([0,0,0]);
  var translateTranny = new Transitionable([0,0,0]);
  translateTrans.set([287,0,0], {duration: 500, curve: 'easeOut'});
  translateTranny.set([0,0,0]);

  $scope.size = [window.innerWidth,window.innerHeight];



  $scope.getTranslated = translateTrans.get.bind(translateTrans);
  $scope.getTranslater = translateTranny.get.bind(translateTranny);
  $(".mainContainer").addClass("faded");

  $scope.select = function () {
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'});
  };

  $scope.go = function(state) {
    console.log(state)
    $state.go(state);
  }

  $scope.main = function($event) {
  translateTranny.set([75,0,0]);
    $(".mainContainer").removeClass("faded");
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
      $state.go('main')
    });
  };


    $scope.account = function () {
      translateTranny.set([50,0,0]);
        $(".mainContainer").removeClass("faded");
        translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
          $state.go('main.institutions')
        });
    };


  $scope.$on('back', function() {
    translateTrans.set([287,0,0], {duration: 500, curve: 'easeOut'});
  });


  });