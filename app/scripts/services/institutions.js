'use strict';

Affordably.factory('institutions', ['$resource', function($resource) {
        return $resource('https://affordably.me//api/v1/institutions');}
]);