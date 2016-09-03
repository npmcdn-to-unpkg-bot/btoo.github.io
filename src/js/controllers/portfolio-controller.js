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
	'$document', /*"uiGmapGoogleMapApi", "ColorService", 'ScrollService',*/
	'$rootScope',
	function($scope, $http, $window, $timeout, projectsService, landingService, skillzService, $location, $anchorScroll, $document, $rootScope /*, uiGmapGoogleMapApi, ColorService, ScrollService*/) {


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


	}
]);