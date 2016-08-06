portfolio.directive('hmDir', ['$timeout',
	function($timeout) {
		return {
			restrict: 'AE',
			controller: 'PortfolioController',
			scope: {
				'spark': '=project',
				'neroli': '=project'
			},
			link: (scope, element, attrs, controller) => {

			},
			compile: function(tElem, tAttrs) {
				return {
					post: function(scope, iElem, iAttrs) {
						// each card needs its own Hammer functions
						Object.keys(scope).forEach(function(key, index) {
							if (key == iAttrs.project) {
								var computedPosition, top, left, card;
								card = iElem[0].getElementsByClassName('card')[0];
								$timeout(() => {
									computedPosition = card.getBoundingClientRect(),
									top = computedPosition.top,
									left = computedPosition.left;
								});
								scope[key] = {
									dragging: false,
									onPan: event => {
										if (event.target === card) {
											scope[key].dragging = true;
											iElem.children().css({
												'left': left + event.deltaX + 'px',
												'top': top + event.deltaY + 'px'
											});
										}
									},
									endPan: event => {
										computedPosition = card.getBoundingClientRect(),
										top = computedPosition.top,
										left = computedPosition.left;
										// scope[key].dragging = false;
									},
									swipeRight: event => {
										// console.log('swiped',event);
									}
								};

							}
						});
					}
				}
			}

		}
	}
]);
