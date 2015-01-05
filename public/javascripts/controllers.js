(function(){
	angular.module('breakfastTime.controllers', [])
		.controller('loginCtrl', ['$scope', '$location', 'breakfastTimeService', function($scope, $location, breakfastTimeService){

			$scope.username = '';
			$scope.password = '';

			$scope.signIn = function(){
				breakfastTimeService.login($scope.username, $scope.password).then(function (data) {
					window.alert(data);
				});
			};
					
			$scope.signUp = function(){
				$location.path('/register')
			};

		}])
		.controller('registerCtrl', ['$scope', '$location', 'breakfastTimeService', function($scope, $location, breakfastTimeService){

			$scope.username = '';
			$scope.email = '';
			$scope.password = '';

			$scope.signUp = function(){
				breakfastTimeService.register($scope.username, $scope.email, $scope.password).then(function () {
					$location.path('/');
				});
			};

			$scope.goLogin = function(){
				$location.path('/');
			};

		}]);
})();