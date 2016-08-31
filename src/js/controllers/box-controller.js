portfolio.controller('BoxController', [
	'$scope',
	'landingService',
	function($scope, landingService) {
		var vm = this;
		$scope.shown = 'front';

		landingService.canAnimateCard().then(()=>{
			document.querySelector('.front.shown').classList += ' bg-dark';
		});

		var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 4;
		var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 4;

		var boxContainerStyle = document.getElementById('box-container').style;
		boxContainerStyle.width = vw+'px';
		boxContainerStyle.height = vh+'px';

		var translateZ = (vw/2) + 'px';
		var box = document.getElementById('box');
		box.style.transform = 'translateZ(-'+translateZ+') rotateY(0deg)';

		var sides = ['front','right','back','left'];
		this.sides = sides;

		for (var i = sides.length - 1; i >= 0; i--) {
			var rotateY;
			switch(sides[i]){
				case 'front':
					rotateY = '0deg'
					break;
				case 'right':
					rotateY = '90deg'
					break;
				case 'back':
					rotateY = '180deg'
					break;
				case 'left':
					rotateY = '-90deg'
					break;
			}
			var side = document.querySelector('#box .'+sides[i]);
			side.style.transform = 'rotateY('+rotateY+') translateZ('+translateZ+')';
			side.style.width = (vw )+'px';
			side.style.height = (vh )+'px';
		}
		landingService.renderedBox();
				

		
		vm.showSide = side => {
			document.querySelector('#side-controls a:last-child').style.animationName = 'none';

			var leftControl = document.querySelector('#side-controls a:first-child');
			var rightControl = document.querySelector('#side-controls a:last-child');

			leftControl.style.opacity = '1';
			rightControl.style.opacity = '1';

			var rotateY;
			switch(side){
				case 'front':
					leftControl.style.opacity = 0;
					rotateY = '0deg'
					break;
				case 'right':
					rotateY = '-90deg'
					break;
				case 'back':
					rotateY = '-180deg'
					break;
				case 'left':
					rightControl.style.opacity = 0;
					rotateY = '-270deg'
					break;
			}
			$scope.shown = side;
			box.style.transform = 'translateZ(-'+translateZ+') rotateY('+rotateY+')';
		}

	}
]);