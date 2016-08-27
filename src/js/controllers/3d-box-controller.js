portfolio.controller('3DBoxController', [
	function() {
		var vm = this;

		// vm.side = 'show-front';

		var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		var boxContainerStyle = document.getElementById('box-container').style;
		boxContainerStyle.width = vw+'px';
		boxContainerStyle.height = vh+'px';

		var translateZ = (vw/2) + 'px';
		var box = document.getElementById('box');
		box.style.transform = 'translateZ(-'+translateZ+') rotateY(0deg)';

		var sides = [
			'front','right','back','left'
		];
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
			side.style.width = (vw -4)+'px';
			side.style.height = (vh -4)+'px';
		}
		

		
		vm.showSide = side => {
			var rotateY;
			switch(side){
				case 'front':
					rotateY = '0deg'
					break;
				case 'right':
					rotateY = '-90deg'
					break;
				case 'back':
					rotateY = '-180deg'
					break;
				case 'left':
					rotateY = '-270deg'
					break;
			}
			box.style.transform = 'translateZ(-'+translateZ+') rotateY('+rotateY+')';
		}

	}
]);