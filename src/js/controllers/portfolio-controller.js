portfolio.controller('PortfolioController', [
	'$scope',
	'$http',
	'$window',
	'$timeout',
	'projectsService',
	'landingService',
	'skillzService',
	'$location',
	'$anchorScroll',
	'$document',
	'$rootScope',
	'$compile',
	function($scope, $http, $window, $timeout, projectsService, landingService, skillzService, $location, $anchorScroll, $document, $rootScope, $compile) {


		$scope.showLandingContent = false;
		$scope.scrollable = 'unscrollable';
		this.scrollableToggle = state => {
			$scope.scrollable = state ? 'scrollable' : 'unscrollable';
		}



		// @TODO: get scope to update OR figure out why apply/watch is getting called twice in a row
		// @TODO: at least refactor this code into a service
		this.closeActionMenu = () => {
			$scope.actionMenuOpened = false;
			document.querySelector('#action-button input').checked = false;
			document.getElementById('box-container').classList.remove('open-menu-blur');
			document.querySelector('#side-controls a:first-child').style.left = 0;
			document.querySelector('#side-controls a:last-child').style.right = 0;
		}


		$scope.actionMenuOpened = false;
		

		// $scope.dummySkillzCategories = skillzService.dummySkillzCategories();

		// initial sorting for skillz
		$scope.skillzOrderProperty = 'skill';
		$scope.skillzOrderReverse = false;

		$scope.skillzFilterCategories = [];
		$scope.toggleCategoryFilter = toggledCategory => {
			// $scope.skillzFilterCategories.indexOf(toggledCategory) > -1 ? 
			if($scope.skillzFilterCategories.indexOf(toggledCategory) > -1)
				$scope.skillzFilterCategories.splice($scope.skillzFilterCategories.indexOf(toggledCategory), 1);
			else
				$scope.skillzFilterCategories.push(toggledCategory);
		}

		$scope.skillzFilterExperienceMin = 0;
		$scope.skillzFilterExperienceMax = 99;

		// $scope.enableCards = 'cardsDisabled';
		// angular.element($window).bind( //when user reaches bottom of page
		// 	"scroll",
	 // 		function() {
		// 		var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		// 		var body = document.body, html = document.documentElement;
		// 		var docHeight = Math.max(body.scrollHeight,
		// 				body.offsetHeight, html.clientHeight,
		// 				html.scrollHeight, html.offsetHeight);
		// 		var windowBottom = windowHeight + window.pageYOffset;
		// 		if (windowBottom >= docHeight) {
		// 			console.log('bottom reached');
		// 			$scope.enableCards = 'cardsEnabled';
		// 		}
		// 	}
		// );

		// $scope.showNetworkMap = false;
		// $scope.$watch('showNetworkMap', () => {
		// 	console.log('changed');
		// });

		$scope.flipToFront = () => {
			projectsService.hideCardBackButtons();

			var cards = document.querySelectorAll('.cards-inner > .card');
			var activeCard = cards[projectsService.activeCard()];
			activeCard.querySelector('.flip-card').classList.remove('flipped');
			$timeout(() => {
				activeCard.querySelector('.flip-card').classList.remove('flipped-complete');
			}, 1000);
		}

		$scope.showProjectModal = () => {
			document.getElementById('project-modal-bg').classList.toggle('modal-shown');

			var modalContent = projectsService.renderProjectModal();
			if(modalContent){
				modalContent.then(template => {
					var projectModal = angular.element(document.getElementById('project-modal'));
					$compile(projectModal.html(template).contents())($scope);
				}, () => {
					console.log('an error occured');
				});
			}
			
		}

		$scope.closeProjectModal = () => {
			document.getElementById('project-modal-bg').classList.remove('modal-shown');
			$timeout(() => {
				projectsService.emptyProjectModal();
			}, 888);
		}

		$scope.projectPreview = '';

	}
]);