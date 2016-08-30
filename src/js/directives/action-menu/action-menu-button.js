portfolio.directive('actionMenuButton',
	() => {
		return {
			link: (scope, element, attrs) => {
				element.bind('click', () => {
					element.toggleClass('open');
					// angular.element(document.getElementById('box-container')).toggleClass('open-menu-blur');
					// console.log(scope.actionMenuOpened);
					// scope.$watch('actionMenuOpened', (newval, oldval) => {
					// 	scope.$apply(() => {
					// 		scope.actionMenuOpened = newval;
					// 	});
					// });

					// console.log('togg');
					// document.getElementById('box-container').classList.toggle('open-menu-blur');


				});




			}
		}
	}
);