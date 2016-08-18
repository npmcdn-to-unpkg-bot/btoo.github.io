portfolio.directive('carouselItem', ['$drag', 'carouselService',
	function($drag, carouselService) {
		return {
			restrict: 'C',
			scope: {},
			transclude: true,
			template: '<div class="item"><div ng-transclude></div></div>',
			link: function(scope, elem, attrs) {
				var id = carouselService.addItem();
				var zIndex = function() {
					var res = 0;
					if (id === carouselService.activeItem()) {
						res = 2000;
					} else if (carouselService.activeItem < id) {
						res = 2000 - (id - carouselService.activeItem());
					} else {
						res = 2000 - (carouselService.itemCount() - 1 - carouselService.activeItem() + id);
					}
					return res;
				};

				scope.$watch(function() {
					return carouselService.activeItem();
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
					move: function(drag) {
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
						elem.removeClass('dismiss');
						if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
							scope.$apply(function() {
								carouselService.next();
							});
						}
						drag.reset();
					}
				});
			}
		};
	}
]);