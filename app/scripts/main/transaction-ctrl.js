'use strict';

Affordably.controller('TransactionCtrl', function ($scope, $famous, $famousPipe) {
	var View     = require("famous/core/View");
	var EventHandler     = require("famous/core/EventHandler");
	var Surface    = require("famous/core/Surface");
	var Scrollview = require("famous/views/Scrollview");
  var Scroller = require("famous/views/Scroller");
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




	require(['famous/modifiers/Draggable'], function(Draggable) {
		require(['famous/modifiers/StateModifier'], function(StateModifier) {

			var capitaliseFirstLetter = function(string) {
			  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			  });
			};


			var transactions = {
		    user: 'Loading...',
		    message: "",
		    time_remaining: "",
		    daily_cash: "",
		    total_available: "",
		    daily_spent: "",
		    fixed_left: "",
		    money_leftover: "",
		    saved: "",
		    users_daily: "",
		    outgoings: [],
		    incomings: [],
		    settings: {},
		    income: "",
		    housing: "",
		    banking: {},
		    monthly_fixed: ""
		  }

		  var data = mainData.loadMain();
		  data.then(function(data) {
		    transactions.outgoings = data.data.outgoings;
		    transactions.incomings = data.data.incomings;

		    // console.log($scope.data.outgoings)
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
		    var monthNames = new Array("January", "February", "March",
		    "April", "May", "June", "July", "August", "September",
		    "October", "November", "December");

				for (var i = 0; i < transactions.outgoings.length; i++) {
				  var container = new ContainerSurface({
				    size: [undefined, 65],
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
	    	    	var that = this
	    	    	setTimeout(function() {
	    		      that.setPosition([0,0,0], {
	    		        curve: Easing.outBounce,
	    		        duration: 400
	    		      });
	    	    	}, 300);
	    	    	// transactions.outgoings[draggable.dragId].category_id = 2
	    	    	$scope.fixed = false;
	    	    	console.log(item.commit("poop"));
	    	    	console.log(item);
				    }
				    else if (e.position[0] == -160) {
				    	var that = this
				    	setTimeout(function() {
					      that.setPosition([0,0,0], {
					        curve: Easing.outBounce,
					        duration: 400
					      });
				    	}, 300);
				    	transactions.outgoings[draggable.dragId].category_id = 1
				    } else {
				    	this.setPosition([0,0,0], {
				    	  curve: Easing.outBounce,
				    	  duration: 300
				    	});
				    }

			      if(transactions.outgoings[draggable.dragId].category_id == 1) {
			      	var image = '/images/coin.png';
			      	item.setContent('<img class="transactionIcon" src="' + image + '" ng-show="fixed"/><div class="transactionNameDate"><h3 class="nameText">' + name + '</h3></div><div class="transactionPrice"><h3>$' + amount + '</h3></div><br><p class="dateText">' + month + ' ' + day + '</p>');
			      } else if(transactions.outgoings[draggable.dragId].category_id == 2) {
			      	var image = '/images/box.png';
			    	  item.setContent('<img class="transactionIcon" src="' + image + '" ng-show="fixed"/><div class="transactionNameDate"><h3 class="nameText">' + name + '</h3></div><div class="transactionPrice"><h3>$' + amount + '</h3></div><br><p class="dateText">' + month + ' ' + day + '</p>');
			      };
				  });

				  var item = new Surface({
				    size: [undefined, 65],
				    properties: {
				      backgroundColor: "white",
				      borderBottom: "1px solid #e6eaed",
				      lineHeight: "75px",
				      textAlign: "center",
              zIndex: 4
				    }
				  });


				  var name = transactions.outgoings[i].name.toLowerCase();
				  name = capitaliseFirstLetter(name);
				  if(name.length > 20) name = name.substring(0,20);

				  var amount = transactions.outgoings[i].amount.toFixed(2);
				  if(transactions.outgoings[i].posted_date != null) {
				  	var date = new Date(transactions.outgoings[i].posted_date);
				  	var day = date.getDate();
				  	var month = monthNames[date.getMonth()];
				  } else {
				  	var day = "";
				  	var month = "";
				  };

				  if(transactions.outgoings[i].category_id == 1) {
				  	var image = '/images/coin.png';
				  	item.setContent('<img class="transactionIcon" src="' + image + '"/><div class="transactionNameDate"><h3 class="nameText">' + name + '</h3></div><div class="transactionPrice"><h3>$' + amount + '</h3></div><br><p class="dateText">' + month + ' ' + day + '</p>');
				  } else if(transactions.outgoings[i].category_id == 2) {
				  	var image = '/images/box.png';
					  item.setContent('<img class="transactionIcon" src="' + image +'" ng-show="fixed"/><div class="transactionNameDate"><h3 class="nameText">' + name + '</h3></div><div class="transactionPrice"><h3>$' + amount + '</h3></div><br><p class="dateText">' + month + ' ' + day + '</p>');
				  };


				  var backgroundYesModifier = new StateModifier({
				    //on the left
				    origin: [0,0],
				    opacity:0
				  });
				  var backgroundYes = new Surface({
				    content: "Fixed",
				    size: [160, 65],
				    properties: {
				      backgroundColor: "rgba(0,255,0,0.2)",
				      lineHeight: "75px",
				      textAlign: "center"
				    }
				  });
				  var backgroundNoModifier = new StateModifier({
				    //on the right
				    origin: [1,0],
				    opacity: 0
				  });
				  var backgroundNo = new Surface({
				    content: "Discretionary",
				    size: [160, 65],
				    properties: {
				      backgroundColor: "rgba(255,0,0,0.2)",
				      lineHeight: "75px",
				      textAlign: "center"
				    }
				  });

	              var spacer = new Surface({
	                size: [undefined, 6],
	                properties: {
	                    backgroundColor: "#f4f8fb",
	                    zIndex: '6'
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
          surfaces.push(spacer);
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
});