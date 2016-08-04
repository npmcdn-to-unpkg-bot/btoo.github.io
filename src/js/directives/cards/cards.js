portfolio.directive('hmDir', [ /*dependencies*/
	function() {
		return {
			restrict: 'AE',
			link: (scope, element, attrs, controller) => {
				// console.log('link', scope, elem, attr, controller);
				console.log(scope);
				scope.onHammer = event => {
					if (event.target === element[0].children[0]) {
						var x = event.center.x - 250,
							y = event.center.y - 250;

						scope.boxMessage = '{x:' + x + ', y:' + y + '}';

						console.log(element.children());

						element.children().css({
							'left': x + 'px',
							'top': y + 'px'
						});
					}
				};



				// return function(scope, element, attrs) {
				// 	console.log(element);
				// 	return $(element).hammer({
				// 			prevent_default: false,
				// 			drag_vertical: false
				// 		})
				// 		.bind("tap", function(ev) {
				// 			console.log('rappin');
				// 			return scope.$apply(attrs['onTap']);
				// 		});
				// };
			},
			// controller: 'PortfolioController',
			// compile: (tElement, tAttrs, transclude) => {
			// 	return {
			// 		pre: (scope, elem, attr, controller) => {
			// 			// console.log('pre', scope, iElement, iAttrs, controller);
			// 		},
			// 		post: (scope, elem, attr, controller) => {
			// 			// console.log('post', scope, iElement, iAttrs, controller);

			// 			console.log(scope);
			// 			scope.onHammer = function onHammer(event) {
			// 				if (event.target === element[0].children[0]) {
			// 					var x = event.center.x - 250,
			// 						y = event.center.y - 250;

			// 					scope.boxMessage = '{x:' + x + ', y:' + y + '}';

			// 					console.log(element.children());

			// 					element.children().css({
			// 						'left': x + 'px',
			// 						'top': y + 'px'
			// 					});
			// 				}
			// 			};
			// 		}
			// 	};
			// }

		}






		// return (scope, element, attrs) => {

		// 	var touchControl = new Hammer(element);
		// 	touchControl.on('dragright', event => {
		// 		var elementToDrag = event.target;
		// 		elementToDrag.style.left = event.gesture.deltaX + 'px';
		// 	});


		// 	// /*return */$(element).hammer({
		// 	// 		prevent_default: false,
		// 	// 		drag_vertical: false
		// 	// 	})
		// 	// 	.bind("tap", function(ev) {
		// 	// 		console.log('rappin', element);
		// 	// 		return scope.$apply(attrs['onTap']);
		// 	// 	});
		// };


	}
]);
