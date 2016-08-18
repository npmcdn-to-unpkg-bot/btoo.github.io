portfolio.factory('carouselService', [
	function(){
		var itemCount = 0;
		var activeItem = null;

		return {
			itemCount: () => { return itemCount; },
			activeItem: () => { return activeItem; },
			addItem: function() {
				var newId = itemCount++;
				activeItem = itemCount === 1 ? newId : activeItem;
				return newId;
			},
			next: function() {
				activeItem = activeItem || 0;
				activeItem = activeItem === itemCount - 1 ? 0 : activeItem + 1;
			},
			prev: function() {
				activeItem = activeItem || 0;
				activeItem = activeItem === 0 ? itemCount - 1 : activeItem - 1;
			}
		}
	}
]);