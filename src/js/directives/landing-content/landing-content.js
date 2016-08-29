portfolio.directive('landingContent', [
	'$timeout',
	'landingService',/*'ColorService', */
	function($timeout, landingService/*ColorService*/){
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/landing-content/landing-content.html',
			scope: false, //use scope from PortfolioController
			link: (scope, element, attr, ctrl) => {

				var greeting = element[0].querySelector('h1');
				var intro = element[0].querySelector('p');

				// finished animating squares, so animate landing card
				landingService.canAnimateCard().then(()=>{
					console.log('finished animating squares, so now animate the card');


					$timeout(() => {
						scope.showLandingContent = true;
						angular.element(document.getElementById('action-button')).toggleClass('show-action-button');
					});

					var greetingAnimationHalwayFinished = false;
					anime({
						targets: greeting,
						// delay: 88,
						translateY: {
							value: ['22rem', '0rem'],
							duration: 1888,
							direction: 'alternate'
						},
						scale: {
							value: [0, 1],
							duration: 222,
							easing: 'easeInElastic'
						},
						opacity: {
							value: [0, 1],
							duration: 888,
							easing: 'linear'
						},
						update: animation => { // animate intro paragraph
							if(greetingAnimationHalwayFinished==false && animation.progress>50){
								greetingAnimationHalwayFinished = true;
								intro.style.display = 'block';
								anime({
									targets: intro,
									delay: 88,
									translateY: {
										value: ['8rem', '0rem'],
										duration: 88,
										direction: 'normal'
									},
									scale: {
										value: [0, 1],
										duration: 88
									},
									opacity: {
										value: [0, 1],
										duration: 888
									}
								});
							}
						}
					});



					
				});


			}
		};
	}
]);