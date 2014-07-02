'use strict';

Affordably.controller('MainCtrl', function ($scope, $famous, $window, $state, $http) {

    var EventHandler = $famous['famous/core/EventHandler'];
    // var Transitionable = $famous['famous/transitions/Transitionable'];

    $scope.eventHandler = new EventHandler();

  	$http({
  	  method: 'GET',
  	  url: "http://localhost:3000/api/v1/index",
  	  params: {
  	  	auth_token: $window.sessionStorage.token
  	  }
  	}).success(function(data) {
      // $state.go('wait', {job: data.job});
	  	console.log("data", data)
	  }).error(function(error) {
	  	console.log("error", error)
	  });


    //now make things animate
    $scope.settings = function() {
	    // translateTrans.set([317,0,0], {duration: 500, curve: 'easeOut'});
    };

  });