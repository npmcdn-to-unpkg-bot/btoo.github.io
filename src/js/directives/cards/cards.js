portfolio.directive('hmDir', [ '$timeout',
	function($timeout) {
		return {
			restrict: 'AE',
			controller: 'PortfolioController',
			link: (scope, element, attrs, controller) => {

				var top, left;
				$timeout(() => {
					top = document.getElementsByClassName('swipable')[0].style.top,
					left = document.getElementsByClassName('swipable')[0].style.left;
					top = parseInt(top,10);
					left = parseInt(left,10);
					console.log(top, left);
				});

				scope.onHammer = event => {
					if (event.target === element[0].children[0]) {
						element.children().css({
							'left': left + event.deltaX + 'px',
							'top': top + event.deltaY + 'px'
						});
					}
				};

				scope.endHammer = event => {
					top = document.getElementsByClassName('swipable')[0].style.top,
					left = document.getElementsByClassName('swipable')[0].style.left;
					top = parseInt(top,10);
					left = parseInt(left,10);
					console.log(top, left);
				};

			}

		}
	}
]);
