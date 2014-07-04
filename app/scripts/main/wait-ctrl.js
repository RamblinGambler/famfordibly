Affordably.controller('WaitCtrl', function ($scope, $famous, $state, $http, $stateParams) {
  'use strict';
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var load;
  var count = 0;
  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);
  console.log($stateParams.job);
  $scope.third = true;

  function plan_progress(){
    load = window.setInterval(loadPlan,1000);
  }

  function loadPlan(){
    count ++;
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/status',
        params: {
          job_id: $stateParams.job
        }
      }).success(function(data) {
        var active = JSON.parse(data.message);
        switch (active.id) {
          case 1:
            $state.go('main');
            break;

          case 2:
            break;

          case 3:
            $state.go('main');
            break;

          case  4:
            $state.go('main');
            break;

          case 6:
            $state.go('main');
            break;

          case 7:
            break;

          case 8:
            break;

          case 9:
            break;

          case 10:
            break;

          // case 11:
          //  activateButton();
          //  break;
          default:
            if(count > 120) {
              // activateErrorButton();
            }
        }
      });
  }
  plan_progress();
});