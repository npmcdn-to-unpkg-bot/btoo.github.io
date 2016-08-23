portfolio.directive('hmDir', ['$timeout', '$http', 'projectsService',
	function($timeout, $http, projectsService) {
		return {
			restrict: 'AE',
			controller: 'PortfolioController',
			scope: true,
			// scope: {
			// 	'spark': '=project',
			// 	'neroli': '=project'
			// },
			link: (scope, element, attrs, controller) => {
				// console.log(attrs);

			},
			compile: function(tElem, tAttrs) {
				return {
					pre: function(scope, iElem, iAttrs) {
						console.log(scope);
						// scope.$watch('project', function(value) {
						// 	// setInterval(()=>{console.log(value);},1000);

						// 	projectsService.canAddMethods().then(() => {



						// 		var computedPosition, top, left, card, cardHeight;

						// 		// console.log(iElem[0].getElementsByClassName('card')[0]);
						// 		card = iElem[0].getElementsByClassName('card')[0];
						// 		// console.log(card);
						// 		cardHeight = card.offsetHeight;
						// 		// console.log(card.getBoundingClientRect());
						// 		computedPosition = card.getBoundingClientRect();
						// 		$timeout(() => {
						// 			// computedPosition = card.getBoundingClientRect(),
						// 			top = computedPosition.top - cardHeight,
						// 				left = computedPosition.left;
						// 		});

						// 		// console.log(scope.projects);
						// 		// console.log(iAttrs.project);
						// 		// console.log(scope.projects[iAttrs.project]);
						// 		// console.log(scope.projects);
						// 		value.hammer = {
						// 			onPan: event => {
						// 				console.log(event);
						// 				if (event.target === card) {
						// 					// scope[key].dragging = true;
						// 					iElem.children().css({
						// 						'left': left + event.deltaX + 'px',
						// 						'top': top - cardHeight + event.deltaY + 'px'
						// 					});
						// 				}
						// 			},
						// 			endPan: event => {
						// 				computedPosition = card.getBoundingClientRect(),
						// 					top = computedPosition.top - cardHeight,
						// 					left = computedPosition.left;
						// 				// scope[key].dragging = false;
						// 			},
						// 			swipeRight: event => {
						// 				// console.log('swiped',event);
						// 			}
						// 		};
						// 		// console.log(scope.projects[iAttrs.project]);


						// 		 // hm-panmove="{{project.hammer.onPan}}" hm-panend="{{project_name}}.hammer.endPan" hm-swiperight="project.hammer.swipeRight" 

						// 		// console.log(iElem);
						// 		console.log(scope);
						// 		// iElem.val('hm-panmove',)


						// 	});

						// });





						projectsService.canAddMethods().then(() => {
							$timeout(() => {
								// var computedPosition, top, left, card, cardHeight;

								// // console.log(iElem[0].getElementsByClassName('card')[0]);
								// card = iElem[0].getElementsByClassName('card')[0];
								// // console.log(card);
								// cardHeight = card.offsetHeight;
								// // console.log(card.getBoundingClientRect());
								// computedPosition = card.getBoundingClientRect();
								// $timeout(() => {
								// 	// computedPosition = card.getBoundingClientRect(),
								// 	top = computedPosition.top - cardHeight,
								// 		left = computedPosition.left;
								// });

								// // console.log(scope.projects);
								// // console.log(iAttrs.project);
								// // console.log(scope.projects[iAttrs.project]);
								// scope.projects[iAttrs.project].hammer = {
								// 	onPan: event => {
								// 		console.log(event);
								// 		if (event.target === card) {
								// 			// scope[key].dragging = true;
								// 			iElem.children().css({
								// 				'left': left + event.deltaX + 'px',
								// 				'top': top - cardHeight + event.deltaY + 'px'
								// 			});
								// 		}
								// 	},
								// 	endPan: event => {
								// 		computedPosition = card.getBoundingClientRect(),
								// 			top = computedPosition.top - cardHeight,
								// 			left = computedPosition.left;
								// 		// scope[key].dragging = false;
								// 	},
								// 	swipeRight: event => {
								// 		// console.log('swiped',event);
								// 	}
								// };
								// console.log(scope.projects[iAttrs.project]);
							});
						});

					}

					/*,
					post: function(scope, iElem, iAttrs) {
						// each card needs its own Hammer functions
						Object.keys(scope).forEach(function(key, index) {
							if (key == iAttrs.project) {
								var computedPosition, top, left, card, cardContentHeight;
								card = iElem[0].getElementsByClassName('card')[0],
								cardContentHeight = card.querySelector('.card-content').offsetHeight;
								// console.log(card.getBoundingClientRect());
								computedPosition = card.getBoundingClientRect();
								$timeout(() => {
									// computedPosition = card.getBoundingClientRect(),
									top = computedPosition.top - cardContentHeight,
									left = computedPosition.left;
									// console.log(computedPosition);
								});
								scope[key] = {
									dragging: false,
									onPan: event => {
										if (event.target === card) {
											// scope[key].dragging = true;
											iElem.children().css({
												'left': left + event.deltaX + 'px',
												'top': top - cardContentHeight + event.deltaY + 'px'
											});
										}
									},
									endPan: event => {
										computedPosition = card.getBoundingClientRect(),
										top = computedPosition.top - cardContentHeight,
										left = computedPosition.left;
										// scope[key].dragging = false;
									},
									swipeRight: event => {
										// console.log('swiped',event);
									}
								};

							}
						});
					}
					*/
				}
			}

		}
	}
]);
