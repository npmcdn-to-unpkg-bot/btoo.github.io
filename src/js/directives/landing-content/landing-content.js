portfolio.directive('landingContent', [
	'$timeout',
	'landingService',
	function($timeout, landingService){
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/landing-content/landing-content.html',
			scope: false, //use scope from PortfolioController
			link: (scope, element, attr, ctrl) => {

				var greeting = element[0].querySelector('h1');
				var intro = element[0].querySelector('p');

				// finished animating squares, so animate landing card
				landingService.canAnimateCard().then(() => {
					greeting.style.display = 'block';

					$timeout(() => {
						scope.showLandingContent = true;
						angular.element(document.getElementById('action-button')).toggleClass('show-action-button');
					});

					var greetingAnimationHalwayFinished = false;
					anime({
						targets: greeting,
						delay: 222,
						translateY: {
							value: ['3em', '0em'],
							duration: 1888,
							direction: 'normal',
							delay: 2000
						},
						fontSize: {
							value: ['2em', '1.2em'],
							duration: 1888,
							direction: 'normal',
							delay: 2000
						},
						// opacity: {
						// 	value: [0, 1],
						// 	duration: 888,
						// 	easing: 'linear'
						// },
						update: animation => { // animate intro paragraph
							if(greetingAnimationHalwayFinished==false && animation.progress>50){
								greetingAnimationHalwayFinished = true;
								intro.style.display = 'block';
								anime({
									targets: intro,
									delay: 222,
									opacity: {
										value: [0, 1],
										duration: 888
									},
									complete: () => {
										landingService.animatedCard();
									}
								});
							}
						}
					});

					landingService.canAnimateControls().then(() => {
						$timeout(() => {
							document.getElementById('side-controls').style.opacity = 1;
						}, 888);
					});


					
				});


			}
		};
	}
]);