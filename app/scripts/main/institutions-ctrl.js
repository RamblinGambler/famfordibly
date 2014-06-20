'use strict';

Affordably.controller('InstitutionsCtrl', function ($scope, $famous, $rootScope) {

    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];

   $scope.eventHandler = new EventHandler();

    $scope.institutions = [{name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}];

    $scope.eventHandler = new EventHandler();
    //set things up
    var translateTrans = new Transitionable([0,0,0]);
    $scope.getTranslate = translateTrans.get.bind(translateTrans);
	    translateTrans.set([-287,0,0	], {duration: 500, curve: 'easeOut'});

  });