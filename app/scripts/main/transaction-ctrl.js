'use strict';

Affordably.controller('TransactionCtrl', function ($scope, $famous, $famousPipe) {
	var View = $famous['famous/core/View'];
	var ScrollView = $famous['famous/views/ScrollView'];
	var Modifier = $famous['famous/core/Modifier'];
	var Surface = $famous['famous/core/Surface'];
	// var Transform = $famous['famous/core/Transform'];
	var EventHandler = $famous['famous/core/EventHandler'];
	// var SeqLay = $famous['famous/views/SequentialLayout'];

  // var Engine              = require(["famous/core/Engine"]);
  // var Surface             = require(["famous/core/Surface"]);
  // var StateModifier       = require(["famous/modifiers/StateModifier"]);
  // var Transform           = require(["famous/core/Transform"]);
  var Transitionable      = require("famous/transitions/Transitionable");
  // var SnapTransition = require(["famous/transitions/SnapTransition"]);
  var Draggable           = require(["famous/modifiers/Draggable"]);


	$scope.transaction = new View();

  $scope.eventHandler = new EventHandler();

	var surf = new Surface({
		properties: {
			backgroundColor: '#ffffff',
		},
		content: 'I am a Surface'
	});


	$scope.transaction.add(surf);
	$famousPipe.pipesToTargets($scope.eventHandler, surf);
    var translateT = new Transitionable([0,0,0]);
    $scope.getTranslating = translateT.get.bind(translateT);
	    translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});
    var translateTra = new Transitionable([0,0,0]);
    $scope.getTranslatinger = translateTra.get.bind(translateTra);
        translateTra.set([0,300,0], {duration: 500, curve: 'easeOut'});
    $scope.transactions = _.range(10);


  });