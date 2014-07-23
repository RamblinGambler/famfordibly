'use strict';
Affordably.controller('LinkCtrl', function ($scope, $famous, $state, $http, $window, $stateParams, flash) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);

  $scope.inst = $stateParams.id;
  $scope.spin = false;

  var fields = [];
  $http({
    method: 'GET',
    url: 'https://guavaplan-staging.herokuapp.com/api/v1/institution',
    params: {bank: $stateParams.id, auth_token: $window.sessionStorage.token}
  }).success(function(data) {
    $scope.inst = data.result.institution_detail;
    for(var i = 0;i < data.result.institution_detail.keys.key.length; i++) {
      if (data.result.institution_detail.keys.key[i].display_flag === 'true') {
        fields.push(data.result.institution_detail.keys.key[i]);
      }
    }
    $scope.fields = fields;
  }).error(function() {
  });

  $scope.submit = function(user_id, password, pin) {
    $scope.spin = true;
	  $http({
	    method: 'POST',
	    url: 'https://guavaplan-staging.herokuapp.com/api/v1/add_account',
	    params: {
	    	username: user_id,
	    	auth_token: $window.sessionStorage.token,
	    	password: password,
	    	pin: pin,
	    	count: 1,
	    	institution: $stateParams.id
	    }
	  }).success(function(data) {
          if (data.job) {
              $state.go('wait', {job: data.job});
          } else if (data.challenge_node_id) {
              if (data.type === 'choice') {
                  $state.go('mfa', {
                      type: data.type,
                      text: data.text,
                      inst: data.institution,
                      challenge: data.challenge_node_id,
                      session: data.challenge_session_id,
                      choice1: data.choices[0].text,
                      choice2: data.choices[1].text,
                      choice3: data.choices[2].text
                  });
              } else if (data.type === 'multi-text') {
                  $state.go('mfa', {
                      type: data.type,
                      text1: data.text[0].text,
                      text2: data.text[1].text,
                      inst: data.institution,
                      challenge: data.challenge_node_id,
                      session: data.challenge_session_id
                  });
              } else if (data.type === 'text') {
                  $state.go('mfa', {
                      type: data.type,
                      text: data.text,
                      inst: data.institution,
                      challenge: data.challenge_node_id,
                      session: data.challenge_session_id
                  });
              } else if (data.type === 'image') {
                  $state.go('mfa', {
                      type: data.type,
                      text: data.text,
                      inst: data.institution,
                      challenge: data.challenge_node_id,
                      session: data.challenge_session_id,
                      image: data.image
                  });
              }
          } else {
           $scope.spin = false;
           flash.error = data.message;
           $scope.showError = true;
           $scope.hideError = false;
       }
    }).error(function() {
          $http({
            method: 'POST',
            url: 'https://guavaplan-staging.herokuapp.com/api/v1/add_account',
            params: {
              username: user_id,
              auth_token: $window.sessionStorage.token,
              password: password,
              pin: pin,
              count: 1,
              institution: $stateParams.id
            }
          }).success(function(data) {
                console.log('Success');
                console.log(data);
            // if (data.status === 200) {
                if (data.job) {
                    $state.go('wait', {job: data.job});
                } else if (data.challenge_node_id) {
                    if (data.type === 'choice') {
                        $state.go('mfa', {
                            type: data.type,
                            text: data.text,
                            inst: data.institution,
                            challenge: data.challenge_node_id,
                            session: data.challenge_session_id,
                            choice1: data.choices[0].text,
                            choice2: data.choices[1].text,
                            choice3: data.choices[2].text
                        });
                    } else if (data.type === 'multi-text') {
                        $state.go('mfa', {
                            type: data.type,
                            text1: data.text[0].text,
                            text2: data.text[1].text,
                            inst: data.institution,
                            challenge: data.challenge_node_id,
                            session: data.challenge_session_id
                        });
                    } else if (data.type === 'text') {
                        $state.go('mfa', {
                            type: data.type,
                            text: data.text,
                            inst: data.institution,
                            challenge: data.challenge_node_id,
                            session: data.challenge_session_id
                        });
                    } else if (data.type === 'image') {
                        $state.go('mfa', {
                            type: data.type,
                            text: data.text,
                            inst: data.institution,
                            challenge: data.challenge_node_id,
                            session: data.challenge_session_id,
                            image: data.image
                        });
                    }
                } else {
                 $scope.spin = false;
                 flash.error = data.message;
                 $scope.showError = true;
                 $scope.hideError = false;
             }
          }).error(function(error) {
            flash.error = error.message;
            $scope.spin = false;
          });
	  });
  };
});