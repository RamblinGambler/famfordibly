'use strict';

Affordably.controller('WaitCtrl', function ($scope, $famous, $state, $http, $stateParams) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var times_run = 0;
  var load;
  var error;
  var count = 0;
  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);
  console.log($stateParams.job);
  $scope.third = true;

  function plan_progress(){
    load = window.setInterval(loadPlan,1000);
  };

  function loadPlan(){
    count ++
      $http({
        method: 'GET',
        url: "https://guavaplan-staging.herokuapp.com/api/v1/status",
        params: {
          job_id: $stateParams.job
        }
      }).success(function(data) {
        var active = JSON.parse(data.message);
        console.log(active);
        switch (active.id) {
          case 1:
            console.log("DOESN'T WORK");
            clearInterval(load);
            $state.go('main');
            break;

          case 2:
            console.log("DOESN'T WORK");
            break;

          case 3:
            console.log("WORKS");
            clearInterval(load);
            $state.go('main');
            break

          case  4:
            console.log("WORKS");
            clearInterval(load);
            $state.go('main');
            break;

          case 6:
            console.log("WORKS");
            clearInterval(load);
            $state.go('main');
            break;

          case 7:
            console.log("DOESN'T WORK");
            break;

          case 8:
            console.log("DOESN'T WORK");
            break;

          case 9:
            console.log("DOESN'T WORK");
            break;

          case 10:
            console.log("DOESN'T WORK");
            break;

          default:
            if(count > 120) {
            console.log("DOESN'T WORK");
            };
        };
      })
  }
  plan_progress();
});