zoomTrackerApp.controller('parcelDetailsController',
    function parcelDetailsController($scope, parcelData, $route, myCache, CacheFactory) {

    //default sorting order
    $scope.sortorder = 'name';

    //to store likes in localStorage permanently
    var myCache = CacheFactory.get('myCache');
    myCache.setOptions({
        //to reset cache onexpire
        onExpire : function(key,value){
        myCache.put(key,value);
      }
    });

    //to create the parcels model
    var promise = parcelData.getParcel();
    promise.then(function(event) {
    $scope.parcels = event.parcels;
    //to set deafault parcel
    $scope.parcelDetail = $scope.parcels[0];
    var latlon = $scope.parcelDetail.live_location.latitude + "," + $scope.parcelDetail.live_location.longitude;
    $scope.img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=200x200&sensor=false";
    }, function(event) {
    alert("Failed");
    });

    //to create the apiHits model
    var promise2 = parcelData.getApiHits();
    promise2.then(function(event) {
    $scope.apiHits = event.api_hits;
    }, function(event) {
    alert("Failed");
    });

    //to store parcelId and likes count as key, value pair
    $scope.addToCache = function(key){
      if(isNaN(myCache.get(key)))
       return myCache.put(key, 1);
       return myCache.put(key, myCache.get(key) + 1);
    };

    //to retrieve the cache key value
    $scope.getFromCache = function(key){
        if(isNaN(myCache.get(key)))
        return 0;
        return myCache.get(key);
    };

    $scope.getParcelDetails = function(parcel){
      $scope.parcelDetail = parcel;
      var latlon = $scope.parcelDetail.live_location.latitude + "," + $scope.parcelDetail.live_location.longitude;

      $scope.img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=200x200&sensor=false";
    }

});
