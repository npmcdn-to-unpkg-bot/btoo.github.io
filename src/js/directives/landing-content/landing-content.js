portfolio.directive('landingContent', [
	'$timeout',
	'landingService',
	function($timeout, landingService){
		
		// REMOVE THIS - only for dev
		// landingService.animatedCard();
		
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



					var landingCard = document.getElementById('landing-card');
					var greetingAnimationHalwayFinished = false;
					anime({
						targets: greeting,
						// delay: 222,
						translateY: {
							value: ['15px', '-15px'],
							duration: 1000,
							direction: 'normal',
							delay: 1100
						},
						fontSize: {
							value: ['42px', '30px'],
							duration: 1000,
							direction: 'normal',
							delay: 1100
						},
						opacity: {
							value: [0, 1],
							duration: 345,
							easing: 'linear'
						},
						update: animation => { // animate intro paragraph
							if(greetingAnimationHalwayFinished==false && animation.progress>50){
								greetingAnimationHalwayFinished = true;
								// var aboutMe = document.getElementById('about-me');
								// console.log(aboutMe);
								intro.style.display = 'block';
								anime({
									targets: intro,
									// delay: 222,
									translateY: {
										value: [88, 0],
										duration: 888
									},
									opacity: {
										value: [0, 1],
										duration: 888
									},
									elasticity: 222,
									// delay: 222,
									complete: () => {
										landingService.animatedCard();
									}
								});
							}
						}
					});


					// @TODO: put  in own directive
					landingService.canAnimateControls().then(() => {
						$timeout(() => {
							document.getElementById('side-controls').style.opacity = 1;
							document.querySelector('#side-controls a:last-child').style.transform = "scale(1)";
							document.querySelector('#side-controls a:last-child').style.animation = "pulse .8s infinite alternate";
						}, 888);
					});


					
				});


			}
		};
	}
]);