var portfolio = angular.module('portfolio', [
	'ngAnimate',
	'ngSanitize',
	'mobile-angular-ui',
	'mobile-angular-ui.gestures.drag',
	'mobile-angular-ui.gestures.touch',
	// 'ng-ripple',
	// 'duScroll',
	// 'd3',
	'ngAnimate',
	'ngSanitize'
])
	.filter('byCategories', () => {
		return (skillz, filterByCategories) => {
			if(filterByCategories === undefined || filterByCategories.length == 0)
				return skillz;

			return skillz.filter(skill => {
				// console.log(skill.skill, skill.categories.some( category => filterByCategories.indexOf(category)>-1 ));
				if(skill.categories.some( category => filterByCategories.indexOf(category)>-1 ))
					return skill;
			});
		}
	})
	.filter('byExperience', () => {
		return (skillz, min, max) => {
			return skillz.filter(skill => {
				if(!min) min = 0;

				if(!max) max = 99;

				if(skill.experience >= min && skill.experience <= max)
					return skill;
			});
		}
	})
	.filter('lowerCaseAndReplaceSpaces', () => {
		return (dummySkillzCategory) => {
			return dummySkillzCategory.replace(/\s+/g, '-').toLowerCase();
		}
	})

	// these values are configuration settings for angular-scroll
	// .value('duScrollEasing', x => {
	// 	return 1-x;
	// })
	// .value('duScrollOffset', 88);

	// .run(['rippleConfig', function(rippleConfig) {
	// 	rippleConfig.rippleOpacity = .2;
	// 	rippleConfig.rippleDelay = 100;
	// }]);
