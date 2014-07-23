'use strict';

Affordably.factory('institutions', ['$resource', function($resource) {
        return $resource('https://guavaplan-staging.herokuapp.com//api/v1/institutions');}
]);