portfolio.controller('PortfolioController', [
	'$scope',
	'$http',
	'$window',
	'$timeout',
	'projectsService',
	'landingService',
	'$location',
	'$anchorScroll',
	'$document', /*"uiGmapGoogleMapApi", "ColorService", 'ScrollService',*/
	'$rootScope',
	function($scope, $http, $window, $timeout, projectsService, landingService, $location, $anchorScroll, $document, $rootScope /*, uiGmapGoogleMapApi, ColorService, ScrollService*/) {


		$scope.showLandingContent = false;
		$scope.scrollable = 'unscrollable';
		this.scrollableToggle = state => {
			$scope.scrollable = state ? 'scrollable' : 'unscrollable';
		}



		this.closeActionMenu = () => {
			console.log('closing');
			$scope.actionMenuOpened = false;
			document.querySelector('#action-button input').checked = false;
			document.getElementById('box-container').classList.remove('open-menu-blur');
		}


		$scope.actionMenuOpened = false;
		


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