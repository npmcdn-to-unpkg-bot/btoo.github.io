portfolio.controller("PortfolioController", ["$scope", '$http', 'projectsService',  /*"uiGmapGoogleMapApi", "ColorService", 'ScrollService',*/
	function($scope, $http, projectsService/*, uiGmapGoogleMapApi, ColorService, ScrollService*/) {

		$scope.projects = {};
		// ProjectsService.loadProjectsInto($scope.projects);
		$http.get('resources/json/projects.json')
			.then(response => {
				// console.log(response.data);
				$scope.projects = response.data;
				// console.log($scope);
				projectsService.loadedProjects();
			});


		var birthdate = moment("1993-08-24 00:00").startOf('minute');
		this.ageyears = moment().diff(birthdate, 'years');
        this.agemonths = moment().subtract(this.ageyears, 'years').diff(birthdate, 'months');
        this.ageseconds = moment().subtract(this.ageyears, 'years').subtract(this.agemonths, 'months').diff(birthdate, 'seconds');
        setInterval(() => $scope.$apply(() =>
            this.ageseconds++ //make me older by a second every second
        ), 1000);

		function landingScroll(){
			var windowTopHTML = $("html").scrollTop();
			var windowTopBody = $("body").scrollTop();
			var windowTop = Math.max(windowTopHTML, windowTopBody);
			if (windowTop > 50) {
				$('.landing-background').removeClass('navbar');
				$('landing-card').addClass('navbar');
			}
			else {
				$('.landing-background').addClass('navbar');
				$('landing-card').removeClass('navbar');
			}
		}

		this.initialScroll = function() {
			$scope.scrollable = 'scrollable';
			var top = 0;
			if ($('#intro').offset().top - 120 + $('#intro')[0].offsetHeight - $(window).height() > $('#intro').offset().top) {
				top = $('#intro').offset().top - 120;
			}
			else {
				top = $('#intro').offset().top + $('#intro')[0].offsetHeight - $(window).height();
			}
			$("html, body").stop().animate({
				scrollTop: top
			}, 800);
		}


		$scope.showLandingContent = false;
		// $scope.scrollable = 'unscrollable';
		$scope.scrollable = 'auto';


	}
]);