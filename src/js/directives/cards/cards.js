portfolio.directive('swipableCard', function() {
	return function(scope, element, attrs) {

		console.log(element);


		return $(element).hammer({
				prevent_default: false,
				drag_vertical: false
			})
			.bind("tap", function(ev) {
				console.log('rappin');
				return scope.$apply(attrs['onTap']);
			});
	};
});