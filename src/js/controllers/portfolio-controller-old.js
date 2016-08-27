// portfolio.controller('PortfolioController', [
// 	'$scope',
// 	'$http',
// 	'$window',
// 	'projectsService',
// 	'$location',
// 	'$anchorScroll',
// 	'$document', /*"uiGmapGoogleMapApi", "ColorService", 'ScrollService',*/
// 	'$rootScope',
// 	function($scope, $http, $window, projectsService, $location, $anchorScroll, $document, $rootScope /*, uiGmapGoogleMapApi, ColorService, ScrollService*/) {
// 		var self = this;


// 		$scope.projects = [];
// 		// ProjectsService.loadProjectsInto($scope.projects);
// 		$scope.renderCards= false;
// 		// $http.get('resources/json/projects.json')
// 		// 	.then(response => {
// 		// 		// console.log(response.data);
// 		// 		console.log('loading');
// 		// 		$scope.projects = response.data;
// 		// 		// projectsService.loadedProjects();
// 		// 		// $scope.renderCards = true;
// 		// 	});

// 		// projectsService.loadProjects()
// 		// projectsService.canAddToScope().then(() => {
// 		// 	$scope.projects = projectsService.projects();
// 		// 	console.log($scope.projects);
// 		// });
		
// 		// projectsService.projects().then(() => {
// 		// 	// $rootScope.projects = 
// 		// 	console.log(this);
// 		// });
// 		// console.log($rootScope.projects);
// 		$rootScope.$watch('projects', () => {
// 			console.log('updated');
// 			console.log($rootScope.projects);
// 		});


// 		var birthdate = moment("1993-08-24 00:00").startOf('minute');
// 		this.ageyears = moment().diff(birthdate, 'years');
//         this.agemonths = moment().subtract(this.ageyears, 'years').diff(birthdate, 'months');
//         this.ageseconds = moment().subtract(this.ageyears, 'years').subtract(this.agemonths, 'months').diff(birthdate, 'seconds');
//         setInterval(() => $scope.$apply(() =>
//             this.ageseconds++ //make me older by a second every second
//         ), 1000);

// 		$scope.goToSecond = () => {
// 			// $location.hash('second');
// 			// $anchorScroll();
// 			$document.scrollToElementAnimated(angular.element(document.getElementById('second')));
// 		}


// 		$scope.showLandingContent = false;
// 		$scope.scrollable = 'scrollable';
// 		this.scrollableToggle = state => {
// 			$scope.scrollable = state ? 'scrollable' : 'unscrollable';
// 			// console.log($scope.scrollable);
// 		}



// 		angular.element($window).bind( //when user reaches bottom of page
// 			"scroll",
// 	 		function() {
// 				var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
// 				var body = document.body, html = document.documentElement;
// 				var docHeight = Math.max(body.scrollHeight,
// 						body.offsetHeight, html.clientHeight,
// 						html.scrollHeight, html.offsetHeight);
// 				var windowBottom = windowHeight + window.pageYOffset;
// 				if (windowBottom >= docHeight) {
// 					// alert('bottom reached');
// 					console.log('bottom reached');
// 					// self.scrollableToggle(false);
// 				}
// 			}
// 		);



// 		// var gottem = false;
// 		// $http.get('resources/json/items.json')
// 		// 	.then(response => {
// 		// 		// $scope.projects 
// 		// 		// if(gottem === false){
// 		// 		// 	console.log(response.data);
// 		// 		// 	gottem = true;	
// 		// 		// }
// 		// 		setTimeout(() => {
// 		// 			console.log(response.data);
// 		// 			console.log('finished');
// 		// 		}, 5555);
				
// 		// 	});
// 		// $http({
// 		// 	method: 'GET',
// 		// 	url: 'resources/json/items.json'
// 		// }).then(function successCallback(response) {
// 		// 	// this callback will be called asynchronously
// 		// 	// when the response is available
// 		// 	console.log('success',response.data);
// 		// }, function errorCallback(response) {
// 		// 	// called asynchronously if an error occurs
// 		// 	// or server returns response with an error status.
// 		// 	console.log('error',response.data);
// 		// });
// 		// $http({
// 		// 	method: 'GET',
// 		// 	url: 'resources/json/items.json'
// 		// }).success((data,status) => {
// 		// 	console.log('success',data);
// 		// }).error((data,status) => {
// 		// 	console.log('error',data);
// 		// });


// 	}
// ]);