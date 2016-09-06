/**
 * 
 */

document.observe("dom:loaded", function() {
	//smooth scroll to # or top
	jQuery('a[href*=#]:not([href=#])').click(
			function() {
				if (location.pathname.replace(/^\//, '') == this.pathname
						.replace(/^\//, '')
						&& location.hostname == this.hostname) {
					var target = jQuery(this.hash);
					target = target.length ? target : jQuery('[name='
							+ this.hash.slice(1) + ']');
					if (target.length) {
						jQuery('html,body').animate({
							scrollTop : target.offset().top
						}, 1000);
						return false;
					}
				}
			});

	
	jQuery("a[href='#top']").click(function() {
		jQuery("html, body").animate({
			scrollTop : 0
		}, 1000);
		return false;
	});

	//olark customer service chat
	olark('api.box.hide');
	var open = false;
	jQuery('#olark_chat').click(function() {
		if (!open) {
			olark('api.box.expand');
			open = true;
		} else {
			olark('api.box.hide');
			open = false;
		}
	})
	
	
	//watch long video
	jQuery('#watch-long').click(function(){
		jQuery.fancybox.open(jQuery.fancybox('<iframe src="//player.vimeo.com/video/115088313" width="700" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', ({
	    'closeBtn': false
	  })));
	  
	});
	

	jQuery('#watch_video').click(function() {
		jQuery.fancybox.open( jQuery.fancybox( '<iframe width="560" height="315" src="//www.youtube.com/embed/Mb9WZAfznAE" frameborder="0" allowfullscreen></iframe>',
				({'closeBtn' : false }) ));
	});	
	jQuery('#21day').click(function() {
		jQuery.fancybox.open( jQuery.fancybox( '<iframe width="560" height="315" src="//www.youtube.com/embed/WoPYCHLCtzI" frameborder="0" allowfullscreen></iframe>',
				({'closeBtn' : false }) ));
	});	

	jQuery('.level-top').on('mouseover', function() {	
	
		if (jQuery("#hoverdiv").length > 0){
			
		} else {
									
		jQuery('<div style="background-color:#000; height:2000px; left:0; position:fixed; width:100%; opacity:0.5; z-index:3;" id="hoverdiv"></div>').insertAfter('.topline');

			
			}

	});
	
	jQuery('.level-top').on('mouseout', function() {	
		
		jQuery('#hoverdiv').remove();
		
	});
		
jQuery(window).scroll(function() {
	
	if (jQuery("#hoverdiv").length > 0){
		jQuery('#nav-wide li.level-top').removeClass('over');
			
		jQuery('#hoverdiv').remove();
	} else {
	
	}
	
	
	
});	

});