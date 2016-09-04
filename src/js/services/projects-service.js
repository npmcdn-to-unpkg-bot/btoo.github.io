portfolio.factory('projectsService', [
	'$q',
	'$http',
	'$rootScope',
	'landingService',
	'$timeout',
	function($q, $http, $rootScope, landingService, $timeout){

		// using rootScope and doing $http over here because doesnt work in controller
		landingService.canAnimateCard().then(() => {
			
			$timeout(() => {
				$http.get('resources/json/projects.json')
					.then(response => {
						$rootScope.projects = response.data;
						landingService.loadedProjects();
					});
			}, 888);
			
		});
		

		var cardCount = 0;
		var activeCard = null;


		return {
			cardCount: () => { return cardCount; },
			activeCard: () => { return activeCard; },
			addCard: () => {
				var newId = cardCount++;
				activeCard = cardCount === 1 ? newId : activeCard;
				return newId;
			},
			next: () => {
				activeCard = activeCard || 0;
				activeCard = activeCard === cardCount - 1 ? 0 : activeCard + 1;
			},
			prev: () => {
				activeCard = activeCard || 0;
				activeCard = activeCard === 0 ? cardCount - 1 : activeCard - 1;
			},
			cardSpreadInterval: () => { //cards take up 95% height, so space is 5%
				var cardSpreadInterval = (document.querySelector('.cards-inner').clientHeight * .05) / (cardCount-1);
				if(cardCount > 0) return cardSpreadInterval;
			}
			
		};

	}
]);