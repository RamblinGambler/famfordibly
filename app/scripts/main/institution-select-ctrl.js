'use strict';

Affordably.controller('InstitutionSelectCtrl', function ($scope, $famous, $state, $http) {
  var EventHandler = $famous['famous/core/EventHandler'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  require(["fuse/src/fuse.min"], function(Fuse) {

    var institutions = [];

    $http({
      method: "GET",
      url:"http://localhost:3000/institutions"
    }).success(function(data) {
      // console.log(response);

    var institutions = data



    var options = {
      keys: ['name']
    };

    var f = new Fuse(institutions, options);

    $scope.search = function (bank) {
      $scope.banks = "";
      var result = f.search(bank);
      $scope.banks = result;
      $scope.$broadcast('bankChange', result);
    }
  });

  var translateTrans = new Transitionable([0,0,0]);
  $scope.slide = translateTrans.get.bind(translateTrans);
  translateTrans.set([0,-568,0  ], {duration: 500, curve: 'easeOut'});
    });
  $scope.eventHandler = new EventHandler();



  $scope.back = function () {
  translateTranny.set([-50,0,0]);
    translateTrans.set([0,0,0], {duration: 500, curve: 'easeOut'}, function() {
        $state.go('main');
    });
  };
});