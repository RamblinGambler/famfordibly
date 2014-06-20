'use strict';

Affordably.controller('TransactionCtrl', function ($scope, $famous, $famousPipe) {
	var View     = require("famous/core/View");
	var EventHandler     = require("famous/core/EventHandler");
	var Surface    = require("famous/core/Surface");
	var Scrollview = require("famous/views/Scrollview");
	var RenderNode = require('famous/core/RenderNode');
	var Transform = require('famous/core/Transform');
	var ContainerSurface = require("famous/surfaces/ContainerSurface");
	var Transitionable = require("famous/transitions/Transitionable");
	var Easing = require('famous/transitions/Easing');

	$scope.transaction = new View();
  $scope.eventHandler = new EventHandler();
	var translateT = new Transitionable([0,0,0]);
	$scope.getTranslating = translateT.get.bind(translateT);
	  translateT.set([0,-567,0], {duration: 500, curve: 'easeOut'});
	var translateTra = new Transitionable([0,0,0]);
	$scope.getTranslatinger = translateTra.get.bind(translateTra);
	    translateTra.set([0,300,0], {duration: 500, curve: 'easeOut'});

	var Draggable = require(['famous/modifiers/Draggable'], function(Draggable) {
		var StateModifier = require(['famous/modifiers/StateModifier'], function(StateModifier) {


			var scrollview = new Scrollview();
			var surfaces = [];

			scrollview.sequenceFrom(surfaces);

			var inFrontModifier = new StateModifier({
			  transform: Transform.translate(0, 0, 1)
			});
		  var opacityMod = new StateModifier({
				opacity: 1,
				properties: {
					backgroundColor: 'red'
				}
		  });

			for (var i = 0; i < 15; i++) {

			  var container = new ContainerSurface({
			    size: [undefined, 50],
			    properties: {
			      overflow: 'hidden'
			    }
			  });

			  var draggable = new Draggable( {
			    xRange: [-160, 160],
			    yRange: [0, 0]
			  });

			  draggable.dragId = i;

			  draggable.on('end', function(e) {
			    if (e.position[0] == 160) {
			      console.log('yes surface', this.dragId);
			    }
			    else if (e.position[0] == -160) {
			      console.log('no surface', this.dragId);
			    }
			    else {
			      this.setPosition([0,0,0], {
			        curve: Easing.outBounce,
			        duration: 300
			      });
			    }
			  });

			  var item = new Surface({
			    content: "Item: " + (i + 1),
			    size: [undefined, 50],
			    properties: {
			      backgroundColor: "lightgrey",
			      borderBottom: "1px solid grey",
			      lineHeight: "50px",
			      textAlign: "center",
			      zIndex:4
			    }
			  });

			  var backgroundYesModifier = new StateModifier({
			    //on the left
			    origin: [0,0],
			    opacity:0
			  });
			  var backgroundYes = new Surface({
			    content: "Yes",
			    size: [160, 50],
			    properties: {
			      backgroundColor: "rgba(0,255,0,0.2)",
			      lineHeight: "50px",
			      textAlign: "center"
			    }
			  });
			  var backgroundNoModifier = new StateModifier({
			    //on the right
			    origin: [1,0],
			    opacity: 0
			  });
			  var backgroundNo = new Surface({
			    content: "No",
			    size: [160, 50],
			    properties: {
			      backgroundColor: "rgba(255,0,0,0.2)",
			      lineHeight: "50px",
			      textAlign: "center"
			    }
			  });

			  var node = new RenderNode(draggable);
			  node.add(item);
			  //try to put the draggable in front of the background


			  container.add(inFrontModifier).add(node);
			  container.add(opacityMod);
			  //add the background
			  container.add(backgroundNoModifier).add(backgroundNo);
			  container.add(backgroundYesModifier).add(backgroundYes);

			  item.pipe(draggable);
			  item.pipe(scrollview);
			  surfaces.push(container);
			  $scope.transaction.add(scrollview);


			  var fadeStartf = -10;
			  var fadeEndf   = -100;
			  var fadeStartd = 10;
			  var fadeEndd   = 100;

			  draggable.on('update', function() {

			      var draggable   = this[0];
			      var opacityMod  = this[1];
			      var yesMod  = this[2];

			      var position = draggable.getPosition();

			      console.log(position);
			      if (position[0] < 0) {
				      if ( position[0] > fadeStartf ) {

				          opacityMod.setOpacity(0);

				      } else if ( position[0] > fadeEndf ) {

				          var opacity = (position[0] - fadeStartf) / ( fadeEndf - fadeStartf );

				          opacityMod.setOpacity(opacity);

				      } else {

				          opacityMod.setOpacity(1);
				      }
				    } else {
				      if ( position[0] < fadeStartd ) {

				          yesMod.setOpacity(0);

				      } else if ( position[0] < fadeEndd ) {

				          var opacity = (position[0] - fadeStartd) / ( fadeEndd - fadeStartd );

				          yesMod.setOpacity(opacity);

				      } else {

				          yesMod.setOpacity(1);
				      }
				    }

			  }.bind([draggable,backgroundNoModifier,backgroundYesModifier]));
			}
		});
	});
});