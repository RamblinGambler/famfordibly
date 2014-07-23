'use strict';

Affordably.controller('WaitCtrl', function ($scope, $famous, $state, $http, $stateParams) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Timer = $famous['famous/utilities/Timer'];
  var times_run = 0;
  var load;
  var count = 0;
  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);
  $scope.third = true;

  var plan_prgress = function(){
    load = Timer.setInterval(loadPlan,1000);
  };

  var loadPlan = function(){
    count ++;
      $http({
        method: 'GET',
        url: 'https://guavaplan-staging.herokuapp.com/api/v1/status',
        params: {
          job_id: $stateParams.job
        }
      }).success(function(data) {
        var active = JSON.parse(data.message);
        console.log(active);
        switch (active.id) {
          case 1:
            Timer.clear(load);
            $state.go('main');
            break;

          case 2:
            Timer.clear(load);
            $state.go('main');
            break;

          case 3:
            Timer.clear(load);
            $state.go('main');
            break;

          case  4:
            Timer.clear(load);
            $state.go('main');
            break;

          case 6:
            Timer.clear(load);
            $state.go('main');
            break;

          case 7:
            Timer.clear(load);
            $state.go('main');
            break;

          case 8:
            Timer.clear(load);
            $state.go('main');
            break;

          case 9:
            Timer.clear(load);
            $state.go('main');
            break;

          case 10:
            Timer.clear(load);
            $state.go('main');
            break;

          default:
            if(count > 120) {
            Timer.clear(load);
            $state.go('link');
            }
        }
      });
  };
  plan_progress();
});