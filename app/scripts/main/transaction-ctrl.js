'use strict';

Affordably.controller('TransactionCtrl', ['$scope', '$famous', '$famousPipe', 'mainData', function ($scope, $famous, $famousPipe, mainData) {
	var View     = require('famous/core/View');
	var EventHandler     = require('famous/core/EventHandler');
	var Surface    = require('famous/core/Surface');
	// var Scrollview = require('famous/views/Scrollview');
  var Scroller = require('famous/views/Scroller');
	var RenderNode = require('famous/core/RenderNode');
	var Transform = require('famous/core/Transform');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
	var Transitionable = require('famous/transitions/Transitionable');
	var Easing = require('famous/transitions/Easing');

	$scope.transaction = new View();
  $scope.eventHandler = new EventHandler();

	var transactions = {};
  transactions.outgoings = mainData.data.outgoings;
  transactions.incomings = mainData.data.incomings;
	var surfaces = [];

	var capitaliseFirstLetter = function(string) {
	  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	};

	require(['famous/modifiers/Draggable'], function(Draggable) {
		require(['famous-infinitescroll/infiniteScrollView'], function(InfiniteScrollView) {
			require(['famous/modifiers/StateModifier'], function(StateModifier) {



				var scrollview = new InfiniteScrollView(
					{
					  margin: 1000,
					  offset: 1500
					}
				);


				scrollview.sequenceFrom(surfaces);

				var inFrontModifier = new StateModifier({
				    transform: Transform.translate(0, 0, 0)
				});

			    var opacityMod = new StateModifier({
					opacity: 1,
					properties: {
						backgroundColor: 'red'
					}
			    });
		    var monthNames = new Array('January', 'February', 'March',
		    'April', 'May', 'June', 'July', 'August', 'September',
		    'October', 'November', 'December');

		    var count = 0;
				for (var i = 0; i < 25; i++) {
					count++;
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
				    if (e.position[0] === 160) {
	    	    	var that = this;
	    	    	setTimeout(function() {
	    		      that.setPosition([0,0,0], {
	    		        curve: Easing.outBounce,
	    		        duration: 400
	    		      });
	    	    	}, 300);
	    	    	$scope.fixed = false;
	    	    	item.setContent('stuff');
	    	    	// item.deploy($scope.transaction);

				    }
				    else if (e.position[0] === -160) {
				    	var that = this;
				    	setTimeout(function() {
					      that.setPosition([0,0,0], {
					        curve: Easing.outBounce,
					        duration: 400
					      });
				    	}, 300);
				    	transactions.outgoings[draggable.dragId].category_id = 1;
				    } else {
				    	this.setPosition([0,0,0], {
				    	  curve: Easing.outBounce,
				    	  duration: 300
				    	});
				    }
				  });


				  var date;
				  var day;
				  var month;
				  var name = transactions.outgoings[i].name;
				  name = capitaliseFirstLetter(name);
				  if(name.length > 20) {name = name.substring(0,20);}

				  var amount = transactions.outgoings[i].amount.toFixed(2);
				  if(transactions.outgoings[i].posted_date !== null) {
				  	date = new Date(transactions.outgoings[i].posted_date);
				  	day = date.getDate();
				  	month = monthNames[date.getMonth()];
				  } else {
				  	day = '';
				  	month = '';
				  }


				  var item = new Surface({
				    size: [undefined, 65],
				    content: '',
				    properties: {
				      backgroundColor: 'white',
				      borderBottom: '1px solid #e6eaed',
				      lineHeight: '75px',
				      textAlign: 'center',
              zIndex: 4,
				    }
				  });

				  if(transactions.outgoings[i].category_id === 1) {
				  	var image = 'images/coin.png';
				  } else if(transactions.outgoings[i].category_id === 2) {
				  	var image = 'images/box.png';
				  } else {
				  	var image = "";
				  };

				  item.setContent('<img class="transactionIcon" src="' + image +'" ng-show="fixed"/><div class="transactionNameDate"><h3 class="nameText">' + name + '</h3></div><div class="transactionPrice"><h3>$' + amount + '</h3></div><br><p class="dateText">' + month + ' ' + day + '</p>');


				  var backgroundYesModifier = new StateModifier({
				    //on the left
				    origin: [0,0],
				    opacity:0
				  });
				  var backgroundYes = new Surface({
				    content: 'Fixed',
				    size: [160, 65],
				    properties: {
				      backgroundColor: '#5698D5',
				      lineHeight: '75px',
				      textAlign: 'center'
				    }
				  });
				  var backgroundNoModifier = new StateModifier({
				    //on the right
				    origin: [1,0],
				    opacity: 0
				  });
				  var backgroundNo = new Surface({
				    content: 'Discretionary',
				    size: [160, 65],
				    properties: {
				      backgroundColor: 'rgba(255,0,0,0.2)',
				      lineHeight: '75px',
				      textAlign: 'center'
				    }
				  });

          var spacer = new Surface({
            size: [undefined, 6],
            properties: {
                backgroundColor: '#f4f8fb',
                zIndex: 6
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

			scrollview.on('infiniteScroll', function(data) {
			    scrollview.infiniteScrollDisabled = true;


			    			var newCount = count;
			    				for (var i = newCount; i < (newCount+25); i++) {
			    					count++;

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
			    				    if (e.position[0] === 160) {
			    	    	    	var that = this;
			    	    	    	setTimeout(function() {
			    	    		      that.setPosition([0,0,0], {
			    	    		        curve: Easing.outBounce,
			    	    		        duration: 400
			    	    		      });
			    	    	    	}, 300);
			    	    	    	$scope.fixed = false;
			    	    	    	item.setContent('stuff');
			    	    	    	item.deploy($scope.transaction);

			    				    }
			    				    else if (e.position[0] === -160) {
			    				    	var that = this;
			    				    	setTimeout(function() {
			    					      that.setPosition([0,0,0], {
			    					        curve: Easing.outBounce,
			    					        duration: 400
			    					      });
			    				    	}, 300);
			    				    	transactions.outgoings[draggable.dragId].category_id = 1;
			    				    } else {
			    				    	this.setPosition([0,0,0], {
			    				    	  curve: Easing.outBounce,
			    				    	  duration: 300
			    				    	});
			    				    }
			    				  });


			    				  var date;
			    				  var day;
			    				  var month;
			    				  var name = transactions.outgoings[i].name;
			    				  name = capitaliseFirstLetter(name);
			    				  if(name.length > 20) {name = name.substring(0,20);}

			    				  var amount = transactions.outgoings[i].amount.toFixed(2);
			    				  if(transactions.outgoings[i].posted_date !== null) {
			    				  	date = new Date(transactions.outgoings[i].posted_date);
			    				  	day = date.getDate();
			    				  	month = monthNames[date.getMonth()];
			    				  } else {
			    				  	day = '';
			    				  	month = '';
			    				  }


			    				  var item = new Surface({
			    				    size: [undefined, 65],
			    				    content: '',
			    				    properties: {
			    				      backgroundColor: 'white',
			    				      borderBottom: '1px solid #e6eaed',
			    				      lineHeight: '75px',
			    				      textAlign: 'center',
			                  zIndex: 4,
			    				    }
			    				  });

			    				  if(transactions.outgoings[i].category_id === 1) {
			    				  	var image = 'images/coin.png';
			    				  	item.setContent('<img class="transactionIcon" src="' + image + '"/><div class="transactionNameDate"><h3 class="nameText">' + name + '</h3></div><div class="transactionPrice"><h3>$' + amount + '</h3></div><br><p class="dateText">' + month + ' ' + day + '</p>');
			    				  } else if(transactions.outgoings[i].category_id === 2) {
			    				  	var image = 'images/box.png';
			    					  item.setContent('<img class="transactionIcon" src="' + image +'" ng-show="fixed"/><div class="transactionNameDate"><h3 class="nameText">' + name + '</h3></div><div class="transactionPrice"><h3>$' + amount + '</h3></div><br><p class="dateText">' + month + ' ' + day + '</p>');
			    				  };


			    				  var backgroundYesModifier = new StateModifier({
			    				    //on the left
			    				    origin: [0,0],
			    				    opacity:0
			    				  });
			    				  var backgroundYes = new Surface({
			    				    content: 'Fixed',
			    				    size: [160, 65],
			    				    properties: {
			    				      backgroundColor: '#5698D5',
			    				      lineHeight: '75px',
			    				      textAlign: 'center'
			    				    }
			    				  });
			    				  var backgroundNoModifier = new StateModifier({
			    				    //on the right
			    				    origin: [1,0],
			    				    opacity: 0
			    				  });
			    				  var backgroundNo = new Surface({
			    				    content: 'Discretionary',
			    				    size: [160, 65],
			    				    properties: {
			    				      backgroundColor: 'rgba(255,0,0,0.2)',
			    				      lineHeight: '75px',
			    				      textAlign: 'center'
			    				    }
			    				  });

			              var spacer = new Surface({
			                size: [undefined, 6],
			                properties: {
			                    backgroundColor: '#f4f8fb',
			                    zIndex: 6
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


			    setTimeout(function () {
			      scrollview.infiniteScrollDisabled = false;
			    }.bind(this), 1000);
			}.bind(this));
			});
			// });
		});
	});
}]);