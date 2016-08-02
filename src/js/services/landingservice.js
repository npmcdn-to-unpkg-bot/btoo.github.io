portfolio.service('landingService', ['$q', function($q){
	
	// animated the B
	this.animatedB = $q.defer();
	// this.animateB.promise.then(console.log('resolved animateB'));

	// created the squares
	this.createdSquares = $q.defer();
	// this.createSquares.promise.then(console.log('resolved createSquares'));

	// finished animating B and creating squares, so animate the squares
	var requiredForAnimatingSquares = [
		this.animatedB.promise,
		this.createdSquares.promise
	];
	this.canAnimateSquares = $q.all(requiredForAnimatingSquares);

	// animated squares
	this.animatedSquares = $q.defer();

	// finished animating squares, so animate landing card
	this.animatedSquares.promise.then(()=>{

	});

	// animated the card
	// this.animatedCard = $q.defer();
	// this.animatedCard.promise






	var qlandingAnimated = $q.defer();
	var plandingAnimated = qlandingAnimated.promise;

	// this.landingAnimated = () => {

	// };

}]);