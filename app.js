var app = angular.module('DAVID', ['smart-table', 'ui.bootstrap', 'ui.directives']);

app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

app.controller('davidController', function($scope, $uibModal, $location, $http) {

    $scope.rowCollection = [];
    $http({
        method: 'POST',
        url: '/getdata'
            // data: { email: email2 }
    }).then(function successCallback(response) {

        var len = response.data.length;
        for (var i = 0; i < len; i++) {
            var temp = [];
            temp.id = response.data[i].id; 
            temp.index = i + 1;
            temp.date = response.data[i].date;
            temp.ip = response.data[i].ip;
            $scope.rowCollection.push(temp);
        }

    }, function errorCallback(response) {
        alert("failed!");

    });

    $scope.sendMessage = function(name,email,subject,message) {

        $http({
            method: 'POST',
            url: '/sendMessage',
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message
            }
        }).then(function successCallback(response) {
            
            alert('successfully sent!');
        }, function errorCallback(response) {
            console.log('wrong! => ', response);

        });
    }
    $scope.removeItem = function removeItem(row) {
        console.log(row);
        $http({
            method: 'POST',
            url: '/deleteItem',
            data: {
                idm: row.id
            }
        }).then(function successCallback(response) {
            console.log('success');
        }, function errorCallback(response) {
            console.log('wrong! => ', response);

        });
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }

    $scope.open = function(row) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                row: function() {
                    return row;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
    };

});

app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, $http, row) {
   $scope.myMap = null;
    $scope.item = {};
    var fdate = row.date;
    var fip = row.ip;
    $http({
        method: 'GET',
        url: 'https://www.freegeoip.net/json/' + row.ip
    }).
    success(function(data, status, headers, config) {
        $scope.item.date = fdate;
        $scope.item.ip = fip;
        $scope.item.country = data.country_name;
        $scope.item.region = data.region_name;
        $scope.item.city = data.city;
        $scope.item.lat = data.latitude;
        $scope.item.long = data.longitude;
        $scope.item.timezone = data.time_zone;

        $scope.lat = data.latitude;
        $scope.long = data.longitude;

    }).
    error(function(data, status, headers, config) {
        alert("get data failed!");
    });

    $scope.ok = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.lat = 0;
    $scope.long = 0;
    $scope.mapOptions = {
        zoom: 15
      
    };

    //Markers should be added after map is loaded
    $scope.onMapIdle = function() {
        var updateCenter = function() {
            var ll = new google.maps.LatLng($scope.lat, $scope.long);
            $scope.myMap.panTo(ll)
            $scope.myMarkers = null;
            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: ll
            });
            $scope.myMarkers = [marker, ];
        }
        $scope.$watch('lat', updateCenter);
        $scope.$watch('long', updateCenter);
    };

    $scope.showMarkerInfo = function(marker) {
        $scope.myInfoWindow.open($scope.myMap, marker);
    };
});
