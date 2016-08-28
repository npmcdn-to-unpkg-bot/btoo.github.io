portfolio.directive('actionButton',
	() => {
		return {
			link: (scope, element, attrs) => {
				element.bind('click', () => {
					element.toggleClass('open');
				});
			}
		}
	}
);