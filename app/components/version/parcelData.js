'use strict';
//to retrie value from the zoomtracker api

zoomTrackerApp.factory('parcelData', function( $resource , $q) {
    var resource = $resource('http://zoomcar-ui.0x10.info/api/courier?type=json&query=list_parcel');
    var resource2 = $resource('https://zoomcar-ui.0x10.info/api/courier?type=json&query=api_hits');
    return {
      getParcel  : function() {
        var deferred = $q.defer();
        resource.get().
        $promise.then( function(response) {
        deferred.resolve(response);
        }, function(response) {
        deferred.reject(response)
       });
       return deferred.promise;
    },

    getApiHits  : function() {
      var deferred = $q.defer();
      resource2.get().
      $promise.then( function(response) {
      deferred.resolve(response);
      }, function(response) {
      deferred.reject(response)
     });
     return deferred.promise;
  }

}});
