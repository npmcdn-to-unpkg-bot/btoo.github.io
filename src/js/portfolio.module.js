var portfolio = angular.module('portfolio', [
	'ngAnimate',
	'ngSanitize',
	'mobile-angular-ui',
	'mobile-angular-ui.gestures.drag',
	'ngAnimate',
	'ngSanitize',
	'duScroll'
])
	// these values are configuration settings for angular-scroll
	// .value('duScrollEasing', x => {
	// 	return 1-x;
	// })
	.value('duScrollOffset', 88);