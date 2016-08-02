portfolio.directive('landingCard', ['landingService',/*'ColorService', */
	function(landingService/*ColorService*/){
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/landing-card/landing-card.html',
			link: (scope, element, attr, ctrl) => {
				// console.log(scope);

				// finished animating squares, so animate landing card
				landingService.animatedSquares.promise.then(()=>{
					console.log('finished animating squares');
				});


			}
		};
	}
]);