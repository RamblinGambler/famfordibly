'use strict';

Affordably.controller('WaitCtrl', function ($scope, $famous, $state, $http, $stateParams) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Timer = $famous['famous/utilities/Timer'];
  var times_run = 0;
  var load;
  var tipLoad;
  var count = 0;
  var tips;
  var translateTrans = new Transitionable([0,0,0]);
  var translateTran = new Transitionable(0);
  $scope.success = translateTrans.get.bind(translateTrans);
  $scope.fadeIn = translateTran.get.bind(translateTran);
  $scope.tip = "";
  translateTran.set(1, {duration : 500, curve: 'easeOut'});


  var plan_progress = function(){
    load = Timer.setInterval(loadPlan,1000);
    tipLoad = Timer.setInterval(tips,9000);
  };

  var tips = function() {
    translateTran.set(0, {duration : 300, curve: 'easeOut'}, function() {
      $scope.tip = tips[count].tip;
    });
    Timer.setTimeout(function() {
      translateTran.set(1, {duration : 500, curve: 'easeOut'});
    }, 1500)
    if (count>33) {
      count = 0
    } else {
      count ++;
    }
  };

  var loadPlan = function(){
      $http({
        method: 'GET',
        url: 'https://guavaplan-staging.herokuapp.com/api/v1/status',
        params: {
          job_id: $stateParams.job
        }
      }).success(function(data) {
      //   tips = data.tips;
      //   var active = JSON.parse(data.message);
      //   switch (active.id) {
      //     case 1:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case 2:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case 3:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case  4:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case 6:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case 7:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case 8:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case 9:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     case 10:
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('main');
      //       break;

      //     default:
      //       if(count > 120) {
      //       Timer.clear(load);
      //       Timer.clear(tipLoad);
      //       $state.go('link', {id:$stateParams.id});
      //       }
      //   }
      });
  };
  plan_progress();
});