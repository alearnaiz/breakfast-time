(function(){
	angular.module('breakfastTime.directives', [])
		.directive('footerBreakfastTime', function(){
			return {
				restrict: 'E',
      			templateUrl: 'partials/footer.html'
			};
		});
})();