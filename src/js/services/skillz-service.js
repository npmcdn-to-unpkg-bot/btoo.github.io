portfolio.factory('skillzService', [
	'$http',
	'$rootScope',
	'landingService',
	'$timeout',
	'$q',
	function($http, $rootScope, landingService, $timeout){

		// var loadedSkillz = $q.defer();
		// var dummySkillzCategoriesList = [];
		$rootScope.dummySkillzCategoriesList = [];
		$http.get('resources/json/skillz.json')
			.then(response => {
				$rootScope.skillz = response.data;
				// dummySkillzCategoriesList = 

				for (var i = response.data.length - 1; i >= 0; i--)
					$rootScope.dummySkillzCategoriesList.push(response.data[i].categories);
				
				console.log($rootScope.dummySkillzCategoriesList);
				// removes duplicates using ES6's spread operator (...) and Set object 
				$rootScope.dummySkillzCategoriesList = [ ...new Set( [].concat( ...$rootScope.dummySkillzCategoriesList) ) ];
				console.log($rootScope.dummySkillzCategoriesList);

			});
			

		return {
			// loadedSkillz: () => {
			// 	return loadedSkillz.resolve();
			// },
			// canPopulateDummySkillzCategoriesList: () => {
			// 	return loadedSkillz.promise;
			// },
			dummySkillzCategoriesList: () => {

			}
		};

	}
]);