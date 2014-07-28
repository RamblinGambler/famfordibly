'use strict';

Affordably.factory('account', ['$resource', function($resource) {
        return $resource('https://www.affordably.me//api/v1/account');}
]);