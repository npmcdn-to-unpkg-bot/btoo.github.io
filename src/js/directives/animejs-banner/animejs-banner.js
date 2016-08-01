portfolio.directive('animejsBanner', [ /*"ColorService",*/
	function( /*,ColorService*/ ) {
		return {
			restrict: 'AE',
			templateUrl: 'js/directives/animejs-banner/animejs-banner.html',
			link: function(scope, element, attr, ctrl) {

				var loadingSquares = element[0].querySelector('#loading-squares');
				var loadScreen = new Promise((resolve, reject) => {
					anime({
						targets: '#Bsvg path',
						strokeDashoffset: {
							easing: 'easeInOutExpo',
							duration: 500,
							value: function(el) {
								var pathLength = el.getTotalLength();
								el.setAttribute('stroke-dasharray', pathLength);
								return [-pathLength, 0];
							}
						},
						stroke: {
							value: function(el, i) {
								return 'rgb('+(i*2)+','+(i*8)+','+(i*12)+')';
							},
							easing: 'linear',
							duration: 222,
						},
						strokeWidth: {
							value: 8,
							easing: 'linear',
							delay: function(el, i) {
								return 600 + (i * 8);
							},
							duration: 222,
						},
						delay: function(el, i) {
							return i * 30;
						},
						duration: 1200,
						easing: 'easeOutExpo',
						loop: false,
						direction: 'alternate',
						begin: () => {
							console.log('beginning');
							console.log(document.getElementsByTagName('body')[0]);
							document.getElementsByTagName('body')[0].addClass('hide-overflow');
						},
						update: (animation) => {
							//start animating squares once B is loaded
							if(animation.reversed==true /*&& animation.progress>75*/)
								resolve(); 
						},
						complete: () => {
							console.log('finished loadingscreen');
							loadingSquares.innerHTML = ''; //clear up memory
						}
					});
				});

				var squares = element[0].querySelector('#squares');

				var createSquares = new Promise((resolve, reject) => {
					var x, y, xmax, ymin, xincrement, yincrement;
					x = y = xmax = ymin = 0;
					var size = Math.min(Math.ceil(element.height()/3.8), 122);
					xincrement = yincrement = size; //width and height of each square

					do {
						squares.innerHTML +=	`
													<article style="width:`+xincrement+`px;height:`+yincrement+`px;top:`+y+`px;right:`+x+`px">
														<div></div>
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
					$('#squares').css('display','block');
					console.log('finished building squares');
					resolve();
				});

				var finishedLoading = [loadScreen,createSquares];

				Promise.all(finishedLoading).then(()=>{ //animate squares loading screen and squares are created
					console.log('finished building loading everything, so now animate');
					anime({
						targets: '#squares div',
						rotate: {
							value: 180,
							duration: 888,
							easing: 'easeInOutQuad'
						},
						scale: {
							value: [0, 1],
							// delay: 150,
							duration: 888,
							easing: 'easeInOutExpo'
						},
						loop: false,
						complete: () => {
							$('body').removeClass('hide-overflow');
							squares.className += 'bg-dark';
							squares.innerHTML = '';
						},
						direction: 'normal',
						borderRadius: {
							value: 0,
							duration: 1222,
							easing: 'easeInOutCirc'
						},
						backgroundColor: '#18212D',
						delay: (el, index, total) => {
							var duration = 888; //duration of squares animation
							return index * (duration / total);
						},
					});
				});

			}
		};
	}
]);
