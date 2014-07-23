'use strict';

Affordably.factory('account', ['$resource', function($resource) {
        return $resource('https://guavaplan-staging.herokuapp.com//api/v1/account');}
]);