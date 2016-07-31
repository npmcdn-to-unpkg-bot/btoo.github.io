portfolio.directive("animejsBanner", [ /*"ColorService",*/
	function( /*ColorService*/ ) {
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/animejs-banner/animejs-banner.html',
			link: function(scope, element, attr, ctrl) {

				var squares = new Promise((resolve, reject)=>{

					var columns = Math.ceil(element.width()/88);
					var rows = Math.ceil(element.height()/88);
					var cells = columns*rows;

					var x, y, xmax, ymin, xincrement, yincrement;
					x = y = xmax = ymin = 0;
					xincrement = yincrement = 88;

					do {
						element[0].childNodes[0].innerHTML +=	`
																	<article style="width:88px;height:88px;top:`+y+`px;right:`+x+`px">
																		<div class="blue"></div>
																	</article>
																`;

						if (x < xincrement || y > element.height()-yincrement) {
							if (xmax < element.width()) {
								xmax += xincrement;
							} else {
								ymin += yincrement;
							}
							y = ymin;
							x = xmax;
						} else {
							x -= xincrement;
							y += yincrement;
						}

					} while (x < element.width() || y < element.height())

					resolve();

				});

				squares.then(()=>{
					console.log('finished building squares, so now animate');
					anime({
						targets: '#squares div',
						rotate: {
							value: 180,
							duration: 1500,
							easing: 'easeInOutQuad'
						},
						scale: {
							value: [0, 1],
							// delay: 150,
							duration: 1500,
							easing: 'easeInOutExpo',
						},
						loop: false,
						complete: () => {
							element[0].childNodes[0].className += 'blue';
							element[0].childNodes[0].innerHTML = ''; //clear the squares so they dont take up memory
						},
						direction: 'normal',
						borderRadius: {
							value: 0,
							duration: 2000,
							easing: 'easeInOutExpo'
						},
						delay: (el, index) => {
							return index * 22;
						}

					});
				});

			}
		};
	}
]);
