portfolio.factory('projectsService', ['$q', '$http',
	function($q, $http){
		
		var loadedProjects = $q.defer();
		// loadedProjects.promise.then(() => {
			
		// });

		return {
			'loadedProjects': () => {
				loadedProjects.resolve();
			},
			'canAddMethods': () => {
				return loadedProjects.promise;
			}
		};

	}
]);