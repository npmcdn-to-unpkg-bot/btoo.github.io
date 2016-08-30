portfolio.factory('landingService', ['$q', function($q){
	
	// rendered the box
	var renderedBox = $q.defer();

	// animated the B
	var animatedB = $q.defer();
	// animatedB.promise.then(console.log('resolved animatedB'));

	// created the squares
	var createdSquares = $q.defer();

	// finished animating B and creating squares, so animate the squares
	var requiredForAnimatingSquares = [
		animatedB.promise,
		createdSquares.promise
	];

	// animated squares
	var animatedSquares = $q.defer();

	// animated explosion
	var animatedExplosion = $q.defer();

	// animated landing card
	var animatedCard = $q.defer();

	return {
		'renderedBox': () => {
			return renderedBox.resolve();
		},
		'canShowBox': () => {
			return renderedBox.promise;
		},
		'animatedB': () => {
			return animatedB.resolve();
		},
		// 'createdSquares': () => {
		// 	return createdSquares.resolve();
		// },
		// 'canAnimateSquares': () => {
		// 	return $q.all(requiredForAnimatingSquares);
		// },
		// 'animatedSquares': () => {
		// 	return animatedSquares.resolve();
		// },
		'canAnimateExplosion': () => {
			return animatedB.promise;
		},
		'animatedExplosion': () => {
			return animatedExplosion.resolve();
		},
		'canAnimateCard': () => {
			// return animatedSquares.promise;
			return animatedExplosion.promise;
		},
		'animatedCard': () => {
			return animatedCard.resolve();
		},
		'canAnimateControls': () => {
			return animatedCard.promise;
		}
	};

}]);