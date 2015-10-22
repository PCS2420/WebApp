'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', function($scope, $location, $rootScope, ListaLivro){
	$scope.exit = function(){
		$rootScope.logged = false;
		$rootScope.usuario = undefined;
		$rootScope.username = undefined;
		$rootScope.password = undefined;
		$location.path("/");	
	};
	
	$scope.montaHome = function(){
		var myDataPromise = ListaLivro.getLivros();
		myDataPromise.then(function(response){
            $scope.livros = response.data;   
			console.log($scope.livros);
         })	
	};
	
  });
  
  
phonecatControllers.factory('ListaLivro', function($http, $rootScope){
	var getLivros = function(){
		return $http.get("http://localhost:1337/livro")
		.success(function(response){
			return response;
		})
		.error(function(error){
			console.log(error);
		});
	};
	return { getLivros: getLivros };
});

  

/*phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);*/
