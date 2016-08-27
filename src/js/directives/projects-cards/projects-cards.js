portfolio.directive('card', [
	'$drag',
	'projectsService',
	($drag, projectsService) => {
		return {
			restrict: 'C',
			transclude: true,
			template: '<div class="project"><div ng-transclude></div></div>',
			controller: 'PortfolioController',
			// require: '^PortfolioController',
			link: function(scope, elem, attrs, PortfolioController) {

				var id = projectsService.addCard();
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

				scope.$watch(() => {
					return projectsService.activeCard();
				}, () => {
					elem[0].style.zIndex = zIndex();
				});

				$drag.bind(elem, {
					transform: (element, transform, touch) => {
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
					move: (drag, event) => {
						event.stopPropagation();
						if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
							elem.addClass('dismiss');
						} else {
							elem.removeClass('dismiss');
						}
					},
					cancel: () => {
						elem.removeClass('dismiss');
					},
					end: drag => {
						PortfolioController.scrollableToggle(true);
						elem.removeClass('dismiss');
						if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
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