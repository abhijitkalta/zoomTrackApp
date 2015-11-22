'use strict';

// Declare app level module which depends on views, and components
var zoomTrackerApp = angular.module('zoomTrackerApp',['ngRoute','ngResource','angular-cache'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/parcelDetails',
    {
        templateUrl:'/app/parcelDetails/parcelDetails.html',

    });
  $routeProvider.otherwise({redirectTo: '/parcelDetails'});



}])
