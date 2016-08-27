portfolio.directive('card', [
	'$drag',
	'$touch',
	'projectsService',
	($drag, $touch, projectsService) => {
		return {
			restrict: 'C',
			transclude: true,
			template: '<div class="project"><div ng-transclude></div></div>',
			controller: 'PortfolioController',
			// require: '^PortfolioController',
			link: (scope, elem, attrs, PortfolioController) => {

				var id, index, zIndex, zIndexDelta;
				id = index = projectsService.addCard();
				zIndexDelta = 0;
				zIndex = elem[0].style.zIndex;

				scope.$watch(() => {
					return projectsService.activeCard();
				}, () => {
					//update zindex
					zIndexDelta = 0;
					if (id === projectsService.activeCard())
						zIndexDelta = 0;
					else if (projectsService.activeCard() < id)
						zIndexDelta = id - projectsService.activeCard();
					else
						zIndexDelta = projectsService.cardCount() - 1 - projectsService.activeCard() + id;
					elem[0].style.zIndex = 2000 - zIndexDelta;

					//update width and position from top 
					if(index<0) index = projectsService.cardCount() - 1;
					index--
					elem[0].style.width = (100 - (index+1)) + '%';
					elem[0].style.top = (projectsService.cardSpreadInterval() * (index+1)) + 'px';
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
						if (Math.abs(drag.distanceX) >= drag.rect.width/4) {
							scope.$apply(function() {
								projectsService.next();
							});
						}
						drag.reset();
					}
				});

				$touch.bind(elem, {
					end: (touchInfo, event) => {
						if (Math.abs(touchInfo.total) < elem[0].clientWidth/8) {
							var flipCard = elem[0].querySelector('.flip-card');
							flipCard.classList.toggle('flipped');
						}
					}
				});


			}
		};
	}
]);

