'use strict';

var app = angular.module('mainApp',[
  'ngRoute',
  'ngResource',  
  'ui.bootstrap',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices']);

// Routes!

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.logged){
					$location.path("/phones");
				}		
			}
		},
		templateUrl: 'login.html'
	})
	.when('/dashboard', {
		resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}		
			}
		},
		redirectTo: '/phones'
	})
	.when('/phones', {
		resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}		
			}
		},
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
    })
    .when('/phones/:phoneId', {
    	resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}		
			}
		},
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
    })
    .when('/register', {
        templateUrl: 'register.view.html',
    })
	.otherwise({
		redirectTo: '/'
	});
});

// End Routes!

// Factorys!

app.factory('usuarioTipoService', function($http, $rootScope){
	var getUserTipo = function(){
		return $http.get("http://localhost:1337/usuario?login=" + $rootScope.username + "&senha=" + $rootScope.password).success(function(response){
			return response[0].tipo;
		});
	};
	return { getUserTipo: getUserTipo };
});

app.factory('userService', function($resource){
    // return $resource('http://jsonplaceholder.typicode.com/users/:user', {user: '@user'} ); // URL  teste
    return $resource('api/users/:user', {user: '@user'} );
});

// End Factorys!
// Controllers!

app.controller('loginCtrl', function($scope, $location, $rootScope, usuarioTipoService){
	$scope.submit = function(){
		$rootScope.username = $scope.username
		$rootScope.password = $scope.password
		var myDataPromisse = usuarioTipoService.getUserTipo();
		myDataPromisse.then(function(response){
			console.log(response.data[0].tipo);
			if(response.data[0].tipo === 'Descritor'){
			$rootScope.logged = true;
			$location.path('/dashboard');
			}
			else{
				alert("nop");
			}
		})
	};
	$scope.register = function(){
		$location.path('/register');
	}
});

app.controller('registerCtrl', function($scope, $location, userService){


    $scope.register = function() {

        $scope.json = angular.toJson($scope.user);


        $scope.falha = false;
        $scope.sucesso = false;

        $scope.dataLoading = true;
        userService.save($scope.json).$promise
        .then(
            function(data){
                $scope.sucesso = true;
                $location.path('/login');
            },
            function(cause){
                $scope.causa = angular.toJson(cause);
                $scope.dataLoading = false;
                $scope.falha = true;
            }
            );
    }

});

// End Controllers!