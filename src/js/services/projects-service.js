portfolio.factory('projectsService', ['$q', '$http', '$rootScope',
	function($q, $http, $rootScope){

		// using rootScope and doing $http over here because doesnt work in controller
		$http.get('resources/json/projects.json')
			.then(response => {
				$rootScope.projects = response.data;
			});

		var cardCount = 0;
		var activeCard = null;


		// var cards = document.querySelectorAll('.card'),
		// 	cardsInner = document.querySelector('.cards-inner'),
		// 	cardSpreadSpace = .12 * cardsInner.clientHeight, //cards take up 88% height, so space is 12%
		// 	numberCards = scope.$index + 1,
		// 	cardSpreadInterval = cardSpreadSpace / (numberCards - 1);
		
		// for (var i=0; i<numberCards; i++) {
		// 	cards[i].style.top = (i * cardSpreadInterval) + 'px';
		// 	console.log();
		// }
		// console.log();

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