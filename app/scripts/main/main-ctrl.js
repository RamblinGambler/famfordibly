'use strict';

Affordably.controller('MainCtrl', function ($scope, $famous, $window, $state, $http, mainData, $filter, $timeout) {

  var EventHandler = $famous['famous/core/EventHandler'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTran = new Transitionable([0,0,0]);
  $scope.tran = translateTran.get.bind(translateTran)

  translateTran.set([0,0,1]);

  $scope.scroller = {
    clipSize: 525,
    edgePeriod: 500,
    edgeDamp: .75
  };



  $scope.eventHandler = new EventHandler();
  $scope.menu = function() {
    translateTran.set([0,0,0]);
    $state.go('.menu');
  };

  $scope.banks = function() {
    translateTran.set([0,0,0]);
    $state.go('.institutions');
  };


  $scope.data = {
      user: 'Loading...',
      message: '',
      time_remaining: '',
      daily_cash: '',
      total_available: '',
      daily_spent: '',
      fixed_left: '',
      money_leftover: '',
      money_left: '',
      saved: '',
      users_daily: '',
      outgoings: [],
      incomings: [],
      settings: {},
      income: '',
      housing: '',
      banking: {},
      monthly_fixed: '',
      budget: ''
    };

  $scope.size = [window.innerWidth,window.innerHeight];
  $scope.scroll = [window.innerWidth,window.innerHeight - 47];

  var data = mainData.loadMain();
  data.then(function(data) {
    var currencyFilter = $filter('currency');
    $scope.data.outgoings = data.data.outgoings;
    $scope.data.incomings = data.data.incomings;
    $scope.data.user = data.data.user;
    $scope.data.users_daily = data.data.users_daily;
    $scope.data.message = data.data.message;
    $scope.data.time_remaining = data.data.time_remaining;
    $scope.data.daily_cash = data.data.daily_cash;
    $scope.data.total_available = 0;
    $scope.data.daily_spent = data.data.daily_spent;
    $scope.data.fixed_left = data.data.fixed_left;
    $scope.data.money_leftover = currencyFilter(data.data.money_leftover, '');
    $scope.data.money_left = data.data.money_leftover;
    $scope.data.settings = data.data.settings;
    $scope.data.saved = data.data.saved;
    $scope.data.income = currencyFilter(data.data.income, '');
    $scope.data.housing = data.data.housing;
    $scope.data.banking = data.data.banking;
    $scope.data.budget = data.data.budget;
    $scope.data.monthly_fixed = currencyFilter(data.data.monthly_fixed, '');

  $scope.myChartOptions =  {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : false,

      //String - The colour of each segment stroke
      segmentStrokeColor : '#DBDBDB',

      //The percentage of the chart that we cut out of the middle.
      percentageInnerCutout : 85,

      //Boolean - Whether we should animate the chart
      animation : false,

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : 'easeOutBounce',

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,

      //Function - Will fire on animation completion.
      onAnimationComplete : null
    };

    $scope.myChartData = [
      {
        value: data.data.daily_cash,
        color:'#49BC79'
      },
      {
        value : data.data.daily_spent,
        color : '#DBDBDB'
      }
    ];
    var weekdays;
    var d = new Date();
    switch(d.getDay()) {
      case 1:
        weekdays = ['M', 'T', 'W', 'Th', 'F', 'S', 'S'];
        break;
      case 2:
        weekdays = ['T', 'W', 'Th', 'F', 'S', 'S', 'M'];
        break;
      case 3:
        weekdays = ['W', 'Th', 'F', 'S', 'S', 'M', 'T'];
        break;
      case 4:
        weekdays = ['Th', 'F', 'S', 'S', 'M', 'T', 'W'];
        break;
      case 5:
        weekdays = ['F', 'S', 'S', 'M', 'T', 'W', 'Th'];
        break;
      case 6:
        weekdays = ['S', 'S', 'M', 'T', 'W', 'Th', 'F'];
        break;
      case 7:
        weekdays = ['S','M', 'T', 'W', 'Th', 'F', 'S'];
        break;
    }

    $scope.chart = {
      labels: weekdays,
      datasets: [
        {
          label: 'Spent',
          fillColor: 'rgba(220,220,220,0)',
          strokeColor: 'white',
          pointColor: 'white',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: data.data.users_daily[0].values
        }
      ]
    };

    $scope.options = {

      animation: false,

      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : '#40719e',

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      scaleOverride: true,

      scaleSteps: 5,

      scaleStepWidth: 20,

      scaleStartValue: 0,

      scaleFontFamily: "'proxima-nova', sans-serif",

      scaleFontSize: 18,

      scaleFontStyle: 'normal',

      scaleFontColor: '#fff',

      scaleLineColor: '#40719e',

      //Boolean - Whether the line is curved between points
      bezierCurve : false,

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 5,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      //String - A legend template
      legendTemplate: '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'

    };
    for (var i = 0; i < data.data.banking.bank.length; i++) {
      if (data.data.banking.bank[i].primary === true) {
        $scope.data.total_available += data.data.banking.bank[i].balance
      };
    };
  });
});