portfolio.controller('PortfolioController', [
	'$scope',
	'$http',
	'$window',
	'projectsService',
	'$location',
	'$anchorScroll',
	'$document', /*"uiGmapGoogleMapApi", "ColorService", 'ScrollService',*/
	'$rootScope',
	function($scope, $http, $window, projectsService, $location, $anchorScroll, $document, $rootScope /*, uiGmapGoogleMapApi, ColorService, ScrollService*/) {
		var self = this;

		// $scope.side = 'show-front';


		var birthdate = moment("1993-08-24 00:00").startOf('minute');
		this.ageyears = moment().diff(birthdate, 'years');
        this.agemonths = moment().subtract(this.ageyears, 'years').diff(birthdate, 'months');
        this.ageseconds = moment().subtract(this.ageyears, 'years').subtract(this.agemonths, 'months').diff(birthdate, 'seconds');
        setInterval(() => $scope.$apply(() =>
            this.ageseconds++ //make me older by a second every second
        ), 1000);

		$scope.goToSecond = () => {
			// $location.hash('second');
			// $anchorScroll();
			$document.scrollToElementAnimated(angular.element(document.getElementById('second')));
		}


		$scope.showLandingContent = false;
		$scope.scrollable = 'scrollable';
		this.scrollableToggle = state => {
			$scope.scrollable = state ? 'scrollable' : 'unscrollable';
		}


		$scope.enableCards = 'cardsDisabled';
		angular.element($window).bind( //when user reaches bottom of page
			"scroll",
	 		function() {
				var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
				var body = document.body, html = document.documentElement;
				var docHeight = Math.max(body.scrollHeight,
						body.offsetHeight, html.clientHeight,
						html.scrollHeight, html.offsetHeight);
				var windowBottom = windowHeight + window.pageYOffset;
				if (windowBottom >= docHeight) {
					console.log('bottom reached');
					$scope.enableCards = 'cardsEnabled';
				}
			}
		);


	}
]);