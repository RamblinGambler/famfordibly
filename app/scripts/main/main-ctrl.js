'use strict';

Affordably.controller('MainCtrl', function ($scope, $famous, $state) {

    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];

    $scope.eventHandler = new EventHandler();
    //set things up
    var translateTrans = new Transitionable([0,0,0]);

    // $scope.sizeModifier = new Modifier();
		// $scope.sizeModifier = function(){
	    // var size = mainContext.getSize();
	    // return [0.5 * size[0],0.5 * size[1]];
		// });

		// if($state.is('main')) {
		// 	$scope.getTranslate = [0,0,1];
		// } else {
	 //    $scope.getTranslate = [0,0,0];

		// };

    //now make things animate
    $scope.settings = function() {
	    // translateTrans.set([317,0,0], {duration: 500, curve: 'easeOut'});
    };

  });