portfolio.factory('landingService', ['$q', function($q){
	
	// animated the B
	// this.animatedB = $q.defer();
	// this.animateB.promise.then(console.log('resolved animateB'));
	var animatedB = $q.defer();
	// animatedB.promise.then(console.log('resolved animatedB'));

	// created the squares
	// this.createdSquares = $q.defer();
	// this.createSquares.promise.then(console.log('resolved createSquares'));
	var createdSquares = $q.defer();

	// finished animating B and creating squares, so animate the squares
	// var requiredForAnimatingSquares = [
	// 	this.animatedB.promise,
	// 	this.createdSquares.promise
	// ];
	// this.canAnimateSquares = $q.all(requiredForAnimatingSquares);
	var requiredForAnimatingSquares = [
		animatedB.promise,
		createdSquares.promise
	];

	// animated squares
	// this.animatedSquares = $q.defer();
	var animatedSquares = $q.defer();

	// finished animating squares, so animate landing card
	// this.animatedSquares.promise.then(()=>{
		
	// });

	// animated the card
	// this.animatedCard = $q.defer();
	// this.animatedCard.promise






	// var qlandingAnimated = $q.defer();
	// var plandingAnimated = qlandingAnimated.promise;


	return {
		'animatedB': () => {
			return animatedB.resolve();
		},
		'createdSquares': () => {
			return createdSquares.resolve();
		},
		'canAnimateSquares': () => {
			return $q.all(requiredForAnimatingSquares);
		},
		'animatedSquares': () => {
			return animatedSquares.resolve();
		},
		'canAnimateCard': () => {
			return animatedSquares.promise;
		}
	};

}]);