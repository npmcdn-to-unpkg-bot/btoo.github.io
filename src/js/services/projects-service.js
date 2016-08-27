portfolio.factory('projectsService', ['$q', '$http', '$rootScope',
	function($q, $http, $rootScope){

		// using rootScope and doing $http over here because doesnt work in controller
		$http.get('resources/json/projects.json')
			.then(response => {
				$rootScope.projects = response.data;
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
			}
		};

	}
]);