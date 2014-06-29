'use strict';

Affordably.controller('InstitutionCtrl', function ($scope, $famous, $state, $filter, $http,
  $window) {

  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);

  $scope.show = translateTrans.get.bind(translateTrans);
  translateTrans.set([0,275,0], {duration: 500, curve: 'easeOut'});

  $scope.$on('bankChange', function(event, banks) {
    // if($filter('filter')(banks, {name: $scope.bank.name})[0].name) {
    //   console.log("me");
    // //   $scope.show = translateTrans.get.bind(translateTrans);
    // //   translateTrans.set([0,-100,0], {duration: 500, curve: 'easeOut'});
    // }
  });

  $scope.select = function(bank) {
    console.log(bank.intuit_inst_id);

    $http({
      method: 'GET',
      url: "http://localhost:3000/api/v1/institution",
      params: {bank: bank.intuit_inst_id, auth_token: $window.sessionStorage.token}
    }).success(function(data) {
      // console.log(data.result.institution_detail);
      translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('link', {details: data.result.institution_detail});
      });
    }).error(function(error) {
    });
  };
});