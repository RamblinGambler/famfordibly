'use strict';

Affordably.controller('FinancesCtrl', function ($scope, $famous, $state) {
        var Transitionable      = require("famous/transitions/Transitionable");


        var translateT = new Transitionable([0,0,0]);
        $scope.getTranslating = translateT.get.bind(translateT);
    	    translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});
        var translateTra = new Transitionable([0,0,0]);
        $scope.getTranslatinger = translateTra.get.bind(translateTra);
            translateTra.set([0,300,0], {duration: 500, curve: 'easeOut'});
        $scope.transactions = _.range(10);


  });