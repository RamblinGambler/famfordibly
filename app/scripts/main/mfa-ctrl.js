'use strict';

Affordably.controller('MfaCtrl', function ($scope, $famous, $state, $http, $window, $stateParams) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);

  $scope.third = true;

  var fields = [];
  $http({
    method: 'GET',
    url: "https://guavaplan-staging.herokuapp.com/api/v1/institution",
    params: {bank: $stateParams.id, auth_token: $window.sessionStorage.token}
  }).success(function(data) {
  	$scope.inst = data.result.institution_detail;
    // console.log(data.result.institution_detail);
  	for(var i = 0;i < data.result.institution_detail.keys.key.length; i++) {
  		if (data.result.institution_detail.keys.key[i].display_flag == 'true') {
				fields.push(data.result.institution_detail.keys.key[i]);
  		}
  	}
  	if (fields.length < 3) {
  		$scope.third = false
  	}
		$scope.fields = fields
		// $scope.load = false;
  }).error(function(error) {
  });


  // var password = $scope.password;
  // var email = $scope.email;

    // console.log($stateParams)
    $scope.inst = $stateParams.id
  $scope.submit = function(user_id, password, pin) {
  	var id = arguments[0], parameters, callback;
  	if (arguments.length == 2) { // only two arguments supplied
  	  if (Object.prototype.toString.call(arguments[1]) == "[object Function]") {
  	    callback = arguments[1]; // if is a function, set as 'callback'
  	  } else {
  	    parameters = arguments[1]; // if not a function, set as 'parameters'
  	    console.log("Error handling");
  	  }
  	} else if (arguments.length == 3) { // three arguments supplied
  	    parameters = arguments[1];
  	    callback = arguments[2];
  	}

  	// PARAMS: institution: count:(for MFA) password2: password3:
	  $http({
	    method: 'POST',
	    url: "https://guavaplan-staging.herokuapp.com/api/v1/add_account",
	    params: {username: user_id, auth_token: $window.sessionStorage.token, password: password, pin: pin, count: 1, institution: $stateParams.id}
	  }).success(function(data) {
	  	console.log(data)
	  }).error(function(error) {
	  });
  console.log(user_id);
  console.log(password);
  console.log(pin);
  };
});