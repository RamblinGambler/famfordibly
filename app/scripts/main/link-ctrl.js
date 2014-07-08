'use strict';

Affordably.controller('LinkCtrl', function ($scope, $famous, $state, $http, $window, $stateParams) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);

  $scope.inst = $stateParams.id

  var fields = [];
  $http({
    method: 'GET',
    url: "https://guavaplan-staging.herokuapp.com/api/v1/institution",
    params: {bank: $stateParams.id, auth_token: $window.sessionStorage.token}
  }).success(function(data) {
    $scope.inst = data.result.institution_detail;
    for(var i = 0;i < data.result.institution_detail.keys.key.length; i++) {
      if (data.result.institution_detail.keys.key[i].display_flag == 'true') {
        fields.push(data.result.institution_detail.keys.key[i]);
      }
    }
    $scope.fields = fields;
    console.log(fields)
  }).error(function(error) {
    console.log(error);
  });

  $scope.submit = function(user_id, password, pin) {
  	// var id = arguments[0], parameters, callback;
  	// if (arguments.length == 2) { // only two arguments supplied
  	//   if (Object.prototype.toString.call(arguments[1]) == "[object Function]") {
  	//     callback = arguments[1]; // if is a function, set as 'callback'
  	//   } else {
  	//     parameters = arguments[1]; // if not a function, set as 'parameters'
  	//     console.log("Error handling");
  	//   }
  	// } else if (arguments.length == 3) { // three arguments supplied
  	//     parameters = arguments[1];
  	//     callback = arguments[2];
  	// }
    console.log(user_id);
    console.log(password);

	  $http({
	    method: 'POST',
	    url: "https://guavaplan-staging.herokuapp.com/api/v1/add_account",
	    params: {
	    	username: user_id,
	    	auth_token: $window.sessionStorage.token,
	    	password: password,
	    	pin: pin,
	    	count: 1,
	    	institution: $stateParams.id
	    }
	  }).success(function(data) {
      $state.go('wait', {job: data.job})
	  }).error(function(error) {
      console.log(error.id);
	  	// $http({
	  	//   method: 'POST',
	  	//   url: "https://guavaplan-staging.herokuapp.com/api/v1/refresh_submit",
	  	//   params: {
	  	//   	username: user_id,
  	 //  	  auth_token: $window.sessionStorage.token,
  	 //  	  password: password,
  	 //  	  pin: pin,
  	 //  	  count: 1,
  	 //  	  institution: $stateParams.id,
  	 //  	  login_id: error.id
	  	//   }
	  	// }).success(function(data) {
    //     $state.go('wait', {job: data.job});
		  // }).error(function(error) {
  	 //  	// console.log("error", error)
		  // });
	  });
  };
});