portfolio.directive('actionMenuButton', [
	'$timeout',
	($timeout) => {
		return {
			controller: 'PortfolioController',
			link: (scope, element, attrs, PortfolioController) => {

				var box = document.getElementById('box-container');

				element.bind('click', () => {
					// element.toggleClass('open');

					$timeout(() => {
						PortfolioController.actionMenuOpened = element[0].querySelector('input').checked ? true : false;

						if(PortfolioController.actionMenuOpened){
							if(!box.classList.contains('open-menu-blur')){
								box.classList.add('open-menu-blur');
								element[0].classList.add('open');
							}
							document.querySelector('#side-controls a:first-child').style.left = '-88vw';
							document.querySelector('#side-controls a:last-child').style.right = '-88vw';
						} else if (!PortfolioController.actionMenuOpened){
							if(box.classList.contains('open-menu-blur')){
								box.classList.remove('open-menu-blur');
								element[0].classList.remove('open');
							}
							document.querySelector('#side-controls a:first-child').style.left = 0;
							document.querySelector('#side-controls a:last-child').style.right = 0;
						}
						
						// document.getElementById('box-container').classList.toggle('open-menu-blur');
					});
					
					// if(element.find('input'))
					// console.log(PortfolioController);
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
]);