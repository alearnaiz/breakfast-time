(function(){
	angular.module('breakfastTime.controllers', [])
		.controller('loginCtrl', ['$scope', '$location', '$window', 'breakfastTimeService', function($scope, $location, $window, breakfastTimeService) {

			$scope.username = '';
			$scope.password = '';
			$scope.loginError = false;

			$scope.signIn = function(){
				breakfastTimeService.login($scope.username, $scope.password).then(function (data) {
					if (data) {
						// if login is right
						$window.localStorage.setItem('username',data[0].username);
						$location.path('/home');
					} else {
						// if login fails
						$scope.loginError = true;
					}
				});
			};
					
			$scope.signUp = function(){
				$location.path('/register');
			};

		}])
		.controller('registerCtrl', ['$scope', '$location', 'breakfastTimeService', function($scope, $location, breakfastTimeService) {

			$scope.username = '';
			$scope.email = '';
			$scope.password = '';
			$scope.registerError = false;
			$scope.registerSuccess = false;

			$scope.signUp = function(){
				breakfastTimeService.createUser($scope.username, $scope.email, $scope.password).then(function (data) {
					if (data) {
						// if register is right
						$scope.registerSuccess = true;
						$scope.registerError = false;
					} else {
						// if register fails
						$scope.registerError = true;
						$scope.registerSuccess = false;
					}

				});
			};

			$scope.goLogin = function(){
				$location.path('/');
			};

		}])
		.controller('homeCtrl', ['$scope', '$location', '$window', 'breakfastTimeService', function($scope, $location, $window, breakfastTimeService) {

			if (!$window.localStorage.getItem('username')) {
				$location.path('/');
			} else {
				$scope.signOut = function(){
					$window.localStorage.clear();
					$location.path('/');
				};

				breakfastTimeService.getActiveBreakfast($window.localStorage.getItem('username')).then(function (data) {
					if (data.length > 0) {
						$scope.breakfast = data[0];
					}
				});

				$scope.createBreakfast = function() {
					$location.path('/create-breakfast');
				};
			}

		}])
		.controller('createBreakfastCtrl', ['$scope', '$location', '$window', 'breakfastTimeService', function($scope, $location, $window, breakfastTimeService) {
			if (!$window.localStorage.getItem('username')) {
				$location.path('/');
			} else {

				breakfastTimeService.getFoods().then(function (data) {
					$scope.foods = data;
				});

				breakfastTimeService.getDrinks().then(function (data) {
					$scope.drinks = data;
				});

				$scope.goHome = function(){
					$location.path('/home');
				};

				$scope.createBreakfast = function() {
					var username = $window.localStorage.getItem('username');
					var foodId;
					var drinkId;
					if ($scope.myFood) {
						foodId = $scope.myFood.id;
					}

					if ($scope.myDrink) {
						drinkId = $scope.myFood.id;
					}

					breakfastTimeService.createBreakfast(username, foodId, drinkId).then(function () {
						$location.path('/home');
					});
				};
			}
		}]);
})();