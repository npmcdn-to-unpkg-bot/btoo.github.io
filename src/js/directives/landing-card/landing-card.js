portfolio.directive('landingCard', [/*'ColorService', */
	function(/*ColorService*/){
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/landing-card/landing-card.html',
			link: (scope, element, attr, ctrl) => {
				console.log(scope);
			}
		};
	}
]);