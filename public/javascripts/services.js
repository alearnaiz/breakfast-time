(function(){
	angular.module('breakfastTime.services', [])
		.factory('breakfastTimeService', ['$http', '$q', function ($http, $q) {

			function login(username, password) {
				var deferred = $q.defer();
				var passingData = {
					username: username,
					password: password
				};
				$http.get('/users/login', {params: passingData})
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			function register(username, email, password) {
				var deferred = $q.defer();
				var passingData = {
					username: username,
					email: email,
					password: password
				};
				$http.post('/users', passingData)
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			return {
				login: login,
				register: register
			};

		}]);
})();