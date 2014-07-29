'use strict';

Affordably.controller('MfaCtrl', function ($scope, $state, $http, $window, $stateParams) {

  $scope.data = $stateParams;

  var choices = [];
  choices.push($stateParams.choice1);
  choices.push($stateParams.choice2);
  choices.push($stateParams.choice3);
  $scope.choices = choices;

  $scope.submit = function(data) {
    $http({
      method: 'POST',
      url: 'https://guavaplan-staging.herokuapp.com/api/v1/mfa_submit',
      params: {
        auth_token: $window.sessionStorage.token,
        answer: data,
        provider: 'intuit',
        challenge_session_id: $stateParams.challenge_session_id,
        challenge_node_id: $stateParams.challenge_node_id,
        institution: $stateParams.id
      }
    }).success(function(data) {
      console.log(data);
    }).error(function(error) {
      console.log(error);
    });
  };

  $scope.submitMulti = function(one, two) {
    console.log(one);
    console.log(two);
  };
});