'use strict';

Affordably.factory('mainData', [
  '$http', '$rootScope', '$window', function($http, $rootScope, $window) {
    var mainData = {
      data: {
        user: 'Loading...',
        message: '',
        time_remaining: '',
        daily_cash: '',
        total_available: '',
        daily_spent: '',
        fixed_left: '',
        money_leftover: '',
        saved: '',
        users_daily: '',
        outgoings: [],
        incomings: [],
        settings: {},
        income: '',
        housing: '',
        banking: {},
        monthly_fixed: ''
      },
      isLoaded: false
    };
    mainData.loadMain = function() {
      return $http({
      	method: 'GET',
      	url: 'https://guavaplan-staging.herokuapp.com/api/v1/index',
      	params: {
      		auth_token: $window.sessionStorage.token
				}
    	}).success(function(data) {
    		// console.log(data);
        mainData.data.outgoings = data.outgoings;
        mainData.data.incomings = data.incomings;
        mainData.data.user = data.user;
        mainData.data.users_daily = data.users_daily;
        mainData.data.message = data.message;
        mainData.data.time_remaining = data.time_remaining;
        mainData.data.daily_cash = data.daily_cash;
        mainData.data.total_available = 0;
        for (var i = 0; i < data.banking.bank.length; i++) {
          if (data.banking.bank[i].primary === true) {
            mainData.data.total_available += data.banking.bank[i].balance;
          }
        }
        mainData.data.daily_spent = data.daily_spent;
        mainData.data.fixed_left = data.fixed_left;
        mainData.data.money_leftover = data.money_leftover;
        mainData.data.settings = data.settings;
        mainData.data.saved = data.saved;
        mainData.data.income = data.income;
        mainData.data.housing = data.housing;
        mainData.data.banking = data.banking;
        mainData.data.monthly_fixed = data.monthly_fixed;
      }).error(function() {
        console.error('Failed to load index.');
      });
    };
    return mainData;
	}
]);
