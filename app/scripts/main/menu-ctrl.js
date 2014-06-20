'use strict';

Affordably.controller('MenuCtrl', function ($scope, $famous, $state) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    //set things up
	    var translateTrans = new Transitionable([0,0,0]);

	    $scope.getTranslated = translateTrans.get.bind(translateTrans);
    //now make things animate
    $scope.select = function () {
		    translateTrans.set([-287,0,0], {duration: 500, curve: 'easeOut'});
    };

    if($state.is('main.menu')) {
	    translateTrans.set([287,0,0], {duration: 500, curve: 'easeOut'});
  	} else {
  		$scope.getTranslated = [287,0,0];
  	}
  });