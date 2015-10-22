'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', '$location', '$rootScope', function($scope, $location, $rootScope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
	$scope.exit = function(){
		$rootScope.logged = false;
		$rootScope.usuario = undefined;
		$rootScope.username = undefined;
		$rootScope.password = undefined;
		$location.path("/");	
	};
	
  }]);
  

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
