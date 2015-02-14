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
			.when('/home', {
				controller: 'homeCtrl',
				templateUrl: 'views/home.html'
			})
			.when('/create-breakfast', {
				controller: 'createBreakfastCtrl',
				templateUrl: 'views/createBreakfast.html'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.hashPrefix('!');
	}]);
})();