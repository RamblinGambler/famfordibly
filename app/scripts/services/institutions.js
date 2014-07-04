Affordably.factory('institutions', ['$resource', function($resource) {
        'use strict';
        return $resource('http://localhost:3000//api/v1/institutions');
    }
]);