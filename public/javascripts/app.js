(function(){
	var app = angular.module('breakfastTime' , [
		'ngRoute', 
		'breakfastTime.controllers',
		'breakfastTime.directives',
		'breakfastTime.services'
	]);

		
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				controller: 'loginCtrl',
				templateUrl: 'views/login.html'
			})
			.when('/register', {
				controller: 'registerCtrl',
				templateUrl: 'views/register.html'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.hashPrefix('!');
	}]);
})();