'use strict';

Affordably.controller('TransactionsCtrl', function ($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var EventHandler = $famous['famous/core/EventHandler'];

    //set things up
    $scope.eventHandler = new EventHandler();
    //now make things animate
    var translateT = new Transitionable([0,0,0]);
    $scope.getTranslating = translateT.get.bind(translateT);
	    translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});
    var translateTra = new Transitionable([0,0,0]);
    $scope.getTranslatinger = translateTra.get.bind(translateTra);

    $scope.transactions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


  });