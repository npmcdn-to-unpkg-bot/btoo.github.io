portfolio.directive('actionMenuItemButton', [
	'$timeout',
	($timeout) => {
		return {
			link: (scope, element, attrs) => {
				element.bind('click', () => {
					$timeout(() => {
						scope.actionMenuOpened = false;
					});
				});
			}
		}
	}
]);