portfolio.directive("animejsBanner", [ /*"ColorService",*/
	function( /*ColorService*/ ) {
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/animejs-banner/animejs-banner.html',
			link: function(scope, element, attr, ctrl) {


				// IE cannot apply CSS transforms on SVG elements. (See https://connect.microsoft.com/IE/feedback/details/811744/ie11-bug-with-implementation-of-css-transforms-in-svg)
				var path = anime.path('#Bpath');

				anime({
					targets: '#loading-squares div',
					translateX: path,
					translateY: path,
					rotate: path,
					duration: 10000,
					loop: true,
					easing: 'linear'
				});

				// anime({
				// 	targets: 'path',
				// 	opacity: 0,
				// 	duration: 6000,
				// 	loop: true,
				// 	direction: 'alternate',
				// 	easing: 'easeInOutExpo'
				// });



				// var squares = element[0].querySelector('#squares');

				// var createSquares = new Promise((resolve, reject)=>{

				// 	var x, y, xmax, ymin, xincrement, yincrement;
				// 	x = y = xmax = ymin = 0;
				// 	xincrement = yincrement = 88; //width and height of each square

				// 	do {
				// 		squares.innerHTML +=	`
				// 									<article style="width:`+xincrement+`px;height:`+yincrement+`px;top:`+y+`px;right:`+x+`px">
				// 										<div class="blue"></div>
				// 									</article>
				// 								`;

				// 		if (x < xincrement || y > element.height()-yincrement) {
				// 			if (xmax < element.width()) {
				// 				xmax += xincrement;
				// 			} else {
				// 				ymin += yincrement;
				// 			}
				// 			y = ymin;
				// 			x = xmax;
				// 		} else {
				// 			x -= xincrement;
				// 			y += yincrement;
				// 		}

				// 	} while (x < element.width() || y < element.height())

				// 	resolve();
				// });

				// createSquares.then(()=>{
				// 	console.log('finished building squares, so now animate');
				// 	anime({
				// 		targets: '#squares div',
				// 		rotate: {
				// 			value: 180,
				// 			duration: 1500,
				// 			easing: 'easeInOutQuad'
				// 		},
				// 		scale: {
				// 			value: [0, 1],
				// 			// delay: 150,
				// 			duration: 1500,
				// 			easing: 'easeInOutExpo'
				// 		},
				// 		loop: false,
				// 		complete: () => {
				// 			squares.className += 'blue';
				// 			squares.innerHTML = ''; //clear the squares so they dont take up memory
				// 		},
				// 		direction: 'normal',
				// 		borderRadius: {
				// 			value: 0,
				// 			duration: 2000,
				// 			easing: 'easeInOutExpo'
				// 		},
				// 		delay: (el, index, total) => {
				// 			// console.log(el, index, total);
				// 			// return index * 22;
				// 			return index * (2500 / total); //the whole animation takes 2 seconds total
				// 		},

				// 	});
				// });

			}
		};
	}
]);
