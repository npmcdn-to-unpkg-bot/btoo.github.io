portfolio.factory('projectsService', [
	'$q',
	'$http',
	'$rootScope',
	'landingService',
	'$timeout',
	'networkMapService',
	'$templateCache',
	'$sce',
	'$templateRequest',
	function($q, $http, $rootScope, landingService, $timeout, networkMapService, $templateCache, $sce, $templateRequest){

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
			},
			showCardBackButtons: () => {
				// console.log(anime.list);
				var cardBackButtons = document.getElementById('card-back-buttons');
				// if(cardBackButtons != 'flex' && document.querySelectorAll('.flip-card')[activeCard].getAttribute('class')==='flip-card'){ //not already shown for whatever reason
					if(cardBackButtons != 'flex'){ //not already shown for whatever reason
					cardBackButtons.style.display = 'flex';
				
					var activeCardData = $rootScope.projects[activeCard];

					if(activeCard != 0)
						cardBackButtons.querySelector('#visit-project-site').setAttribute('href', activeCardData.link.url);

					var showButtonsContainer = anime({
						targets: cardBackButtons,
						opacity: {
							value: [0,1],
							duration: 2222,
							delay: 222
						}
					});
					var showFirstButton = anime({
						targets: cardBackButtons.querySelector('.card-back-button:first-child'),
						translateX: {
							value: ['-8rem','0rem'],
							duration: 2222
						},
						rotate: {
							value: [0,360],
							duration: 2222
						},
						elasticity: 222
					});
					var showLastButton = anime({
						targets: cardBackButtons.querySelector('.card-back-button:last-child'),
						translateX: {
							value: ['8rem','0rem'],
							duration: 2222
						},
						rotate: {
							value: [0,-360],
							duration: 2222
						},
						elasticity: 222
					});
					var showMiddleButton = anime({
						targets: cardBackButtons.querySelector('.card-back-button:not(:first-child):not(:last-child)'),
						translateY: {
							value: ['-8rem','0rem'],
							duration: 2222
						},
						elasticity: 222
					});
				}
				
			},
			hideCardBackButtons: () => {
				var cardBackButtons = document.getElementById('card-back-buttons');
				anime({
					targets: cardBackButtons.querySelectorAll('.card-back-button'),
					opacity: {
						value: [1,0],
						duration: 888
					},
					translateY: '-8em',
					delay: (el, i) => {
						return i*88;
					},
					complete: (animation) => {
						cardBackButtons.style.display = 'none';
						cardBackButtons.querySelectorAll('.card-back-button').forEach(button => {
							button.style.opacity = 1;
						});
					}
				});
			},
			emptyProjectModal: () => { //empty everytime modal is closed
				var projectModalContent = angular.element(document.querySelectorAll('#project-modal > *:not(#project-modal-close)'));
				projectModalContent.remove();
			},
			renderProjectModal: () => {
				var activeCardData = $rootScope.projects[activeCard];
				if(activeCardData.id === 'spark')
					networkMapService.renderSparkNetworkMap();
				else if (activeCardData.preview) {
					var templateUrl = $sce.getTrustedResourceUrl(activeCardData.preview);
					var templateRequest = $templateRequest(templateUrl);
					return templateRequest;
					
				}

			}
			
		};

	}
]);