portfolio.factory('projectsService', ['$q', '$http',
	function($q, $http){
		
		var loadedProjects = $q.defer();
		// loadedProjects.promise.then(() => {
			
		// });


		var cardCount = 0;
		var activeCard = null;

		return {
			'loadedProjects': () => {
				loadedProjects.resolve();
			},
			'canAddMethods': () => {
				return loadedProjects.promise;
			},

			cardCount: () => { return cardCount; },
			activeCard: () => { return activeCard; },
			addCard: function() {
				var newId = cardCount++;
				activeCard = cardCount === 1 ? newId : activeCard;
				return newId;
			},
			next: function() {
				activeCard = activeCard || 0;
				activeCard = activeCard === cardCount - 1 ? 0 : activeCard + 1;
			},
			prev: function() {
				activeCard = activeCard || 0;
				activeCard = activeCard === 0 ? cardCount - 1 : activeCard - 1;
			}
		};

	}
]);