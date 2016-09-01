portfolio.directive('skillz', [
	'skillzService',
	'$rootScope',
	function(skillzService, $rootScope){
		return {
			controller: 'PortfolioController',
			templateUrl: 'js/directives/skillz/killz.html',
			link: (scope, element, attrs, PortfolioController) => {
				// console.log(scope);
				// console.log(skillzService);
				// console.log($rootScope);
			}
		}
	}
]);