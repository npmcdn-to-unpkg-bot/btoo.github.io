portfolio.directive('landingContent', [
	'$timeout',
	'landingService',/*'ColorService', */
	function($timeout, landingService/*ColorService*/){
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/landing-content/landing-content.html',
			scope: false, //use scope from PortfolioController
			link: (scope, element, attr, ctrl) => {

				// finished animating squares, so animate landing card
				landingService.canAnimateCard().then(()=>{
					console.log('finished animating squares, so now animate the card');

					$timeout(() => {
						scope.showLandingContent = true;
						angular.element(document.getElementById('action-button')).toggleClass('show-action-button');
					});


					
				});


			}
		};
	}
]);