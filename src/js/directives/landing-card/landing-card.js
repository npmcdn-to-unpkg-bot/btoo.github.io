portfolio.directive('landingCard', ['landingService',/*'ColorService', */
	function(landingService/*ColorService*/){
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/landing-card/landing-card.html',
			link: (scope, element, attr, ctrl) => {

				// finished animating squares, so animate landing card
				landingService.canAnimateCard().then(()=>{
					console.log('finished animating squares, so now animate the card');
					
				});


			}
		};
	}
]);