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
      $scope.map = { center: { latitude: parcelDetail.live_locations.latitude, longitude:  parcelDetail.live_locations.longitude}, zoom: 8 };

    }
});
