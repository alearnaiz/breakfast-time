(function(){
	angular.module('breakfastTime.services', [])
		.factory('breakfastTimeService', ['$http', '$q', function ($http, $q) {

			function login(username, password) {
				var deferred = $q.defer();
				var params = {
					username: username,
					password: password
				};
				$http.get('/users/login', {params: params})
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			function createUser(username, email, password) {
				var deferred = $q.defer();
				var requestContent = {
					username: username,
					email: email,
					password: password
				};
				$http.post('/users', requestContent)
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			function getActiveBreakfast(username) {
				var deferred = $q.defer();
				$http.get('/users/'+username+'/breakfasts/active')
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			function getFoods() {
				var deferred = $q.defer();
				$http.get('/foods')
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			function getDrinks() {
				var deferred = $q.defer();
				$http.get('/drinks')
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			function createBreakfast(username, foodId, drinkId) {
				var deferred = $q.defer();
				var requestContent = {
					foodId: foodId,
					drinkId: drinkId
				};
				$http.post('/users/'+username+'/breakfasts', requestContent)
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			function editBreakfast(username, breakfastId, foodId, drinkId) {
				var deferred = $q.defer();
				var requestContent = {
					foodId: foodId,
					drinkId: drinkId
				};
				$http.put('/users/'+username+'/breakfasts/'+breakfastId, requestContent)
					.success(function (data) {
						deferred.resolve(data);
					});
				return deferred.promise;
			}

			return {
				login: login,
				createUser: createUser,
				getActiveBreakfast: getActiveBreakfast,
				getFoods: getFoods,
				getDrinks: getDrinks,
				createBreakfast: createBreakfast,
				editBreakfast: editBreakfast
			};

		}]);
})();