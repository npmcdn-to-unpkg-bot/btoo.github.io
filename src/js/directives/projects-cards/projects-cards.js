portfolio.directive('card', ['$drag', 'projectsService',
	function($drag, projectsService) {
		return {
			restrict: 'C',
			transclude: true,
			template: '<div class="project"><div ng-transclude></div></div>',

			// these added to test out ng-repeat with ng-transclude			
			// transclude: 'element',
			// replace: true,
			// scope: true,
			// template: [
			// 	''
			// ],


			controller: 'PortfolioController',
			// require: '^PortfolioController',
			link: function(scope, elem, attrs, PortfolioController) {

					// console.log(scope);
					var id = projectsService.addCard();
					// console.log(elem[0], id);
					var zIndex = function() {
						var res = 0;
						if (id === projectsService.activeCard()) {
							res = 2000;
						} else if (projectsService.activeCard() < id) {
							res = 2000 - (id - projectsService.activeCard());
						} else {
							res = 2000 - (projectsService.cardCount() - 1 - projectsService.activeCard() + id);
						}
						return res;
					};

					scope.$watch(function() {
						return projectsService.activeCard();
					}, function() {
						elem[0].style.zIndex = zIndex();
					});

					$drag.bind(elem, {
						transform: function(element, transform, touch) {
							var t = $drag.TRANSLATE_BOTH(element, transform, touch),
								Dx = touch.distanceX,
								t0 = touch.startTransform,
								sign = Dx < 0 ? -1 : 1,
								angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

							t.rotateZ = angle + (Math.round(t0.rotateZ));
							return t;
						},
						start: (drag, event) => {
							event.stopPropagation();
							PortfolioController.scrollableToggle(false);
						},
						move: function(drag, event) {
							event.stopPropagation();
							if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
								elem.addClass('dismiss');
							} else {
								elem.removeClass('dismiss');
							}
						},
						cancel: function() {
							elem.removeClass('dismiss');
						},
						end: function(drag) {
							PortfolioController.scrollableToggle(true);
							elem.removeClass('dismiss');
							if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
								console.log('is greater');
								scope.$apply(function() {
									projectsService.next();
								});
							}
							drag.reset();
						}
					});
				

			}
		};
	}
]);