/* Login ajax */
function ajaxLogin(ajaxUrl, clear){
	if(clear == true){
		clearHolder();
		jQuery(".ajax-box-overlay").removeClass('loaded');
	}
	jQuery("body").append("<div id='login-holder' />");
	if(!jQuery(".ajax-box-overlay").length){
		jQuery("#login-holder").after('<div class="ajax-box-overlay"><i class="load" /></div>');
		jQuery(".ajax-box-overlay").fadeIn('medium');
	}
	function overlayResizer(){
		jQuery(".ajax-box-overlay").css('height', jQuery(window).height());
	}
	overlayResizer();
	jQuery(window).resize(function(){overlayResizer()});
	
	jQuery.ajax({
		url: ajaxUrl,
		cache: false
	}).done(function(html){
		setTimeout(function(){
			jQuery("#login-holder").html(html).animate({
				opacity: 1,
				top: '100px'
			}, 500 );
			jQuery(".ajax-box-overlay").addClass('loaded');
			clearAll();
		}, 500);
	});
	
	var clearAll = function(){
		jQuery("#login-holder .close-button").on('click', function(){
			jQuery(".ajax-box-overlay").fadeOut('medium', function(){
				jQuery(this).remove();
			});
			clearHolder();
		});
	}
	function clearHolder(){
		jQuery("#login-holder").animate({
			opacity: 0,
			top: 0
		  }, 500, function() {
			jQuery(this).remove();
		});
	}
}

/* Product Hover Images */
function productHoverImages() {
	if(jQuery('span.hover-image').length){
		jQuery('span.hover-image').parent().addClass('hover-exists');
	}
}

/* sidebar accordion close button */
function closeAdd(){
	jQuery('.sidebar section:not(.totals)').each(function(){
		var section = jQuery(this);
		var header = section.find('header');
		
		if(!header.find('.btn-remove').length){
			header.append('<span class="btn-remove"><i class="fa-times fa" /></span>');
			var button = section.find('header .btn-remove');
			var content = section.find('.block-content, .discount-form, .shipping-form');
			
			button.on('click', function(event){
				content.slideToggle();
				button.hide();
				header.addClass('closed');
				section.addClass('closed');
				event.stopPropagation();
				header.on('click', function(){
					content.slideToggle();
					button.show();
					header.removeClass('closed');
					section.removeClass('closed');
					header.off();
				});
			});
		}
	});
}
/* Top Cart */
function topCartListener(e){
	var touch = e.touches[0];
	if(jQuery(touch.target).parents('#topCartContent').length == 0 && jQuery(touch.target).parents('#cartHeader').length == 0 && !jQuery(touch.target).attr('id') != '#cartHeader'){
		jQuery('.top-cart #cartHeader').removeClass('active');
		jQuery('#topCartContent').slideUp(500).removeClass('active');
		document.removeEventListener('touchstart', topCartListener, false);
	}
}
function topCart(){
	jQuery('.top-cart #cartHeader').on('click', function(event){
		event.stopPropagation();
		jQuery(this).toggleClass('active');
		jQuery('#topCartContent').slideToggle(500).toggleClass('active');
		document.addEventListener('touchstart', topCartListener, false);
		
		jQuery(document).on('click.cartEvent', function(e) {
			if (jQuery(e.target).parents('#topCartContent').length == 0) {
				jQuery('.top-cart #cartHeader').removeClass('active');
				jQuery('#topCartContent').slideUp(500).removeClass('active');
				jQuery(document).off('click.cartEvent');
			}
		});
	});
}
/* Top Cart */

/* Wishlist Block Slider */
function wishlist_slider(){
  jQuery('#wishlist-slider .es-carousel').iosSlider({
	responsiveSlideWidth: true,
	snapToChildren: true,
	desktopClickDrag: true,
	infiniteSlider: false,
	navNextSelector: '#wishlist-slider .next',
	navPrevSelector: '#wishlist-slider .prev'
  });
}
 
function wishlist_set_height(){
	var wishlist_height = 0;
	jQuery('#wishlist-slider .es-carousel li').each(function(){
	 if(jQuery(this).height() > wishlist_height){
	  wishlist_height = jQuery(this).height();
	 }
	})
	jQuery('#wishlist-slider .es-carousel').css('min-height', wishlist_height+2);
}
if(jQuery('#wishlist-slider').length){
  whs_first_set = true;
  wishlist_slider();
}
/* Wishlist Block Slider */

/* Labels height */
function labelsHeight(){
	jQuery('.label-type-1 .label-new, .label-type-3 .label-new, .label-type-1 .label-sale:not(.percentage), .label-type-3 .label-sale, .label-type-1 .availability-only, .label-type-3 .availability-only').each(function(){
		labelNewWidth = jQuery(this).outerWidth();
		if(jQuery(this).parents('.label-type-1').length){
			if(jQuery(this).hasClass('percentage') || jQuery(this).hasClass('availability-only')){
				lineHeight = labelNewWidth - labelNewWidth*0.2;
			}else{
				lineHeight = labelNewWidth;
			}
		}else if(jQuery(this).parents('.label-type-3').length){
			if(jQuery(this).hasClass('percentage')){
				lineHeight = labelNewWidth - labelNewWidth*0.2;
			}else{
				lineHeight = labelNewWidth - labelNewWidth*0.1;
			}
		}else{
			lineHeight = labelNewWidth;
		}
		jQuery(this).css({
			'height' : labelNewWidth,
			'line-height' : lineHeight + 'px'
		});
	});
}

/* header cart */
function mobileCart(mode){
	if(jQuery('.main-header').length && jQuery(document.body).width() < 768){
		setTimeout(function(){
			top_cart = jQuery('.main-header .top-cart');
			switch(mode)
			{
			case 'on':
				search = jQuery('.main-header #search_mini_form');
				top_indent = search.offset().top;
				left_indent = search.offset().left + search.outerWidth(true) - 5;
				top_cart.css({
					'top': top_indent,
					'left': left_indent,
					'opacity': 1
				});
			break;
			default:
				top_cart.attr('style', '');
			}
		}, 1000);
	}
}

function menuPosition(){
	setTimeout(function(){
		jQuery('#nav-wide .menu-wrapper').each(function(){
			topIndent = jQuery(this).parent().position().top;
			itemHeight = jQuery(this).parent().height();
			jQuery(this).css('top', topIndent+itemHeight);
		});
	}, 200);
}

jQuery(window).load(function() {
	
	/* Fix for IE */
    	if(navigator.userAgent.indexOf('IE')!=-1 && jQuery.support.noCloneEvent){
			jQuery.support.noCloneEvent = true;
		}
	/* End fix for IE */

	/* More Views Slider */
	if(jQuery('#more-views-slider').length){
		jQuery('#more-views-slider').iosSlider({
		   responsiveSlideWidth: true,
		   snapToChildren: true,
		   desktopClickDrag: true,
		   infiniteSlider: false,
		   navSlideSelector: '.sliderNavi .naviItem',
		   navNextSelector: '.more-views .next',
		   navPrevSelector: '.more-views .prev'
		 });
		
		function more_view_arrows_height(){
			var more_view_max_img_height = 0;
			jQuery('.more-views a.cloud-zoom-gallery').each(function(){
				if(jQuery(this).height() > more_view_max_img_height){
					more_view_max_img_height = jQuery(this).height();
				}
			});
			var more_view_img_height = [more_view_max_img_height];
			jQuery('.more-views .next, .more-views .prev').css({'height': more_view_img_height[0]})
		}
		more_view_arrows_height();
		jQuery(window).resize(function(){more_view_arrows_height();});
		
		
	 }
	 function more_view_set_height(){
		if(jQuery('#more-views-slider').length){
			var more_view_height = 0;
			jQuery('#more-views-slider li a').each(function(){
			 if(jQuery(this).height() > more_view_height){
			  more_view_height = jQuery(this).height();
			 }
			})
			jQuery('#more-views-slider').css('min-height', more_view_height+2);
		}
	 }
	 /* More Views Slider */

	 /* Related Block Slider */
	  if(jQuery('#block-related-slider').length) {
	  jQuery('#block-related-slider').iosSlider({
		   responsiveSlideWidth: true,
		   snapToChildren: true,
		   desktopClickDrag: true,
		   infiniteSlider: false,
		   navSlideSelector: '.sliderNavi .naviItem',
		   navNextSelector: '.block-related .next',
		   navPrevSelector: '.block-related .prev'
		 });
	 } 
	 
	 function related_set_height(){
		var related_height = 0;
		jQuery('#block-related-slider li.item').each(function(){
		 if(jQuery(this).height() > related_height){
		  related_height = jQuery(this).height();
		 }
		})
		jQuery('#block-related-slider').css('min-height', related_height+2);
	}
	 /* Related Block Slider */
	 
   /* Layered Navigation Accorion */
  if (jQuery('#layered_navigation_accordion').length) {
    jQuery('.filter-label').each(function(){
        jQuery(this).toggle(function(){
            jQuery(this).addClass('closed').next().slideToggle(200);
        },function(){
            jQuery(this).removeClass('closed').next().slideToggle(200);
        })
    });
  }
  /* Layered Navigation Accorion */


  /* Product Collateral Accordion */
  if (jQuery('#collateral-accordion').length) {
	  jQuery('#collateral-accordion > div.box-collateral').not(':first').hide();  
	  jQuery('#collateral-accordion > h2').click(function() {
		jQuery(this).parent().find('h2').removeClass('active');
		jQuery(this).addClass('active');
		
	    var nextDiv = jQuery(this).next();
	    var visibleSiblings = nextDiv.siblings('div:visible');
	 
	    if (visibleSiblings.length ) {
	      visibleSiblings.slideUp(300, function() {
	        nextDiv.slideToggle(500);
	      });
	    } else {
	       nextDiv.slideToggle(300, function(){
				if(!nextDiv.is(":visible")){
					jQuery(this).prev().removeClass('active');
				}
		   });
	    }
	  });
  }
  /* Product Collateral Accordion */

  /* My Cart Accordion */
  if (jQuery('#cart-accordion').length) {
	  if (!jQuery('#cart-accordion > .accordion-title').hasClass('active')){
		  jQuery('#cart-accordion > div.accordion-content').hide();	 
	  }
	   
	  
	  jQuery('#cart-accordion > h3.accordion-title').wrapInner('<span/>').click(function(){
	  
		var accordion_title_check_flag = false;
		if(jQuery(this).hasClass('active')){accordion_title_check_flag = true;}
		jQuery('#cart-accordion > h3.accordion-title').removeClass('active');
		if(accordion_title_check_flag == false){
			jQuery(this).toggleClass('active');
	    }
		
		var nextDiv = jQuery(this).next();
	    var visibleSiblings = nextDiv.siblings('div:visible');
	    	
	   
	    if (visibleSiblings.length ) {
	      visibleSiblings.slideUp(300, function() {
	        nextDiv.slideToggle(500);
	      });
	    } else {
	       nextDiv.slideToggle(300);
	    }
		
	  });
	  
	  
  }
  /* My Cart Accordion */
  
  /* Coin Slider */
	
	/* Top Search */
	function topSearch(){
		if (jQuery(document.body).width() > 480) {
			jQuery('header#header .form-search').removeClass('active');
			jQuery("header#header .form-search button.main").on({
				click: function (){
					if ( !jQuery('header#header .form-search').hasClass('touched') ){
						jQuery('header#header .form-search').addClass('active touched');
						closeTouch(jQuery(this));
						return false;
					}
				}
			});
			/* Clear Touch Function */
			function closeTouch(handlerObject){
				jQuery('body').on('click', function(){
					handlerObject.parent().parent().removeClass('active touched');
					jQuery('body').off();
				});
				handlerObject.click(function(event){
					event.stopPropagation();
				});
				handlerObject.prev().click(function(event){
					event.stopPropagation();
				});
			}
		} else {
			jQuery('header#header .form-search').addClass('active');
			jQuery('header#header .form-search button.main').off();
		};
		jQuery('header#header .form-search .indent input').focusin(function() {
			jQuery('header#header .form-search').addClass('focus');
		});
		jQuery('header#header .form-search .indent input').focusout(function() {
			jQuery('header#header .form-search').removeClass('focus');
		});
	}
	topSearch();
	/* Top Search */
	
	/* Fancybox */
	if (jQuery.fn.fancybox) {
		jQuery('.fancybox').fancybox();
	}
	/* Fancybox */

	/* Zoom */
	if (jQuery('#zoom').length) {
		jQuery('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
  	}
	/* Zoom */
	
	function resize_window() {
		jQuery('.content_bottom section').css({
			position:'relative',
			top: (jQuery('.content_bottom').height() - jQuery('.content_bottom section').outerHeight())/2
		});
	}
	resize_window();
	
	/* Responsive */
	var responsiveflag = false;
	var topSelectFlag = false;
	var menu_type = jQuery('#nav').attr('class');
	
	/* Menu */
	function mobileDevicesMenu(action){
		if(action == 'reset'){
			jQuery(".nav-container .nav li a, .nav-container .nav-wide li a").off();
		}else{
			function topMenuListener(e){
				var touch = e.touches[0];
				if(jQuery(touch.target).parents('.nav, .nav-wide').length == 0){
					jQuery(".nav-container:not('.mobile') .nav li, .nav-container:not('.mobile') .nav-wide li").each(function(){
						jQuery(this).removeClass('touched over').children('ul').removeClass('shown-sub');
					});
					document.removeEventListener('touchstart', topMenuListener, false);
				}
			}
			jQuery(".nav-container:not('.mobile') .nav li a, .nav-container:not('.mobile') .nav-wide li.level-top > a").on({
				click: function (e){
					if (jQuery(this).parent().children('ul, .menu-wrapper').length ){
						if(jQuery(this).parent().hasClass('touched')){
							isActive = true;
						}else{
							isActive = false;
						}
						jQuery(this).parent().addClass('touched over');
						document.addEventListener('touchstart', topMenuListener, false);
						if(!isActive){
							return false;
						}
					}
				}
			});
		}
	}
	
	function mobile_menu(mode){
		switch(mode)
		{
		case 'animate':
		   if(!jQuery('.nav-container').hasClass('mobile')){
				if(mobileDevice == true){
					mobileDevicesMenu('reset');
				}
				jQuery(".nav-container").addClass('mobile');
				jQuery('.nav-container > ul').slideUp('fast');
				jQuery('.nav-container > ul').removeClass('active');
				
				function mobileMenuListener(e){
					var touch = e.touches[0];
					if(jQuery(touch.target).parents('.nav-container.mobile').length == 0 && jQuery(touch.target).parents('.menu-button').length == 0 && !jQuery(touch.target).hasClass('menu-button')){
						jQuery('.nav-container.mobile > ul').slideUp('medium');
						document.removeEventListener('touchstart', mobileMenuListener, false);
					}
				}
				jQuery('.menu-button').on('click', function(event){
					event.stopPropagation();
					jQuery('.nav-container > ul').toggleClass('active');
					jQuery('.nav-container > ul').slideToggle('medium');
					document.addEventListener('touchstart', mobileMenuListener, false);
					jQuery(document).on('click.mobileMenuEvent', function(e){
						if (jQuery(e.target).parents('.nav-container.mobile').length == 0 && jQuery(e.target).parents('.second-line').length == 0 && !jQuery(e.target).hasClass('second-line')) {
							jQuery('.nav-container.mobile > ul').slideUp('medium');
							jQuery(document).off('click.mobileMenuEvent');
							jQuery('.nav-container > ul').removeClass('active');
						}
					});
				});
			   jQuery('.nav-container > ul a').each(function(){
					if(jQuery(this).next('ul').length || jQuery(this).next('div.menu-wrapper').length){
						jQuery(this).before('<span class="menu-item-button"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>')
						jQuery(this).next('ul').slideUp('fast');
						jQuery(this).prev('.menu-item-button').on('click', function(){
							jQuery(this).toggleClass('active');
							jQuery(this).nextAll('ul, div.menu-wrapper').slideToggle('medium');
						});
					}
				});
		   }
		break;
		default:
				jQuery(".nav-container").removeClass('mobile');
				jQuery('.menu-button').off();
				jQuery(document).off('click.mobileMenuEvent');
				jQuery('.nav-container > ul').slideDown('fast');
				jQuery('.nav-container .menu-item-button').each(function(){
					jQuery(this).nextAll('ul').slideDown('fast');
					jQuery(this).remove();
				});
				jQuery('.nav-container .menu-wrapper').slideUp('fast');
				if(mobileDevice == true){
					mobileDevicesMenu();
				}
		}
	}
	
	function accordion (status){
		if(status == 'enable'){
			jQuery('.footer-columns-block h3').on('click', function(){
				jQuery(this).toggleClass("active").parent().find(".custom-footer-content").slideToggle('medium');
				wishlist_slider();
			})
			jQuery('.footer-columns-block').addClass('accordion').find(".custom-footer-content").slideUp('fast');
		}else{
			jQuery('.footer-columns-block h3').removeClass("active").off().parent().find(".custom-footer-content").slideDown('fast');
			jQuery('.footer-columns-block').removeClass('accordion');
		}
	}
	function toDo(){
		if (jQuery(document.body).width() < 767 && responsiveflag == false){
		    accordion('enable');
			
			/* Top Menu Select */
			if(topSelectFlag == false){
				jQuery('.nav-container .sbSelector').wrapInner('<span />').prepend('<span />');
				topSelectFlag = true;
			}
			jQuery('.nav-container .sbOptions li a').on('click', function(){
				if(!jQuery('.nav-container .sbSelector span').length){
					jQuery('.nav-container .sbSelector').wrapInner('<span />').prepend('<span />');
				}
			});
			/* //Top Menu Select */
			responsiveflag = true;
		}
		else if (jQuery(document.body).width() > 767){
			accordion('disable');
			responsiveflag = false;
		}
	}
	function replacingClass () {

	   if (jQuery(document.body).width() < 480) { //Mobile
			mobile_menu('animate');
			mobileCart('on');
	   }
	   if (jQuery(document.body).width() > 479 && jQuery(document.body).width() < 768) { //iPhone
			mobile_menu('animate');
			mobileCart('on');
	   }  
	   else if (jQuery(document.body).width() > 767) { //Desktop
			mobile_menu('reset');
			mobileCart('off');
	   }
		if (jQuery(document.body).width() > 767 && jQuery(document.body).width() < 977){ //Tablet
			mobile_menu('reset');
			mobileCart('off');
	    }
		if (jQuery(document.body).width() > 1279){ //Extra Large
			mobile_menu('reset');
			mobileCart('off');
		}
	}
	replacingClass();
	toDo();
	more_view_set_height();
	wishlist_set_height();
	related_set_height();
	menuPosition();
	labelsHeight();
	//menuHeight2();
	jQuery(window).resize(function(){toDo(); replacingClass(); more_view_set_height(); wishlist_set_height(); related_set_height(); resize_window(); topSearch(); menuPosition();});
	/* Responsive */
	
	/* Top Menu */
	function menuHeight2 () {
		var menu_min_height = 0;
		jQuery('#nav li.tech').css('height', 'auto');
		jQuery('#nav li.tech').each(function(){
			if(jQuery(this).height() > menu_min_height){
				menu_min_height = jQuery(this).height();
			}
		});		
		jQuery('#nav li.tech').each(function(){
			jQuery(this).css('height', menu_min_height + 'px');
		});
	}
	
	/* Top Selects */
	function option_class_add(items, is_selector){
		jQuery(items).each(function(){
			if(is_selector){
				jQuery(this).removeAttr('class'); 
				jQuery(this).addClass('sbSelector');
			}			
			stripped_string = jQuery(this).html().replace(/(<([^>]+)>)/ig,"");
			RegEx=/\s/g;
			stripped_string=stripped_string.replace(RegEx,"");
			jQuery(this).addClass(stripped_string.toLowerCase());
			if(is_selector){
				tags_add();
			}
		});
	}
	option_class_add('.sbOptions li a, .sbSelector', false);
	jQuery('.sbOptions li a, .sbSelector').on('click', function(){
		option_class_add('.sbSelector', true);
	});	
	function tags_add(){
		jQuery('.sbSelector').each(function(){
			if(!jQuery(this).find('span.text').length){
				jQuery(this).wrapInner('<span class="text" />').append('<span />').find('span:last').wrapInner('<span />');
			}
		});
	}
	tags_add();
	/* //Top Selects */
	
	
	if (jQuery('body').hasClass('retina-ready')) {
		/* Mobile Devices */
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))){
			
			/* Mobile Devices Class */
			jQuery('body').addClass('mobile-device');
			
			/* Menu */
			jQuery(".nav-container:not('.mobile') #nav li").on({
	            click: function (){
	                if ( !jQuery(this).hasClass('touched') && jQuery(this).children('ul').length ){
						jQuery(this).addClass('touched');
						clearTouch(jQuery(this));
						return false;
	                }
	            }
	        });
			
			/* Clear Touch Function */
			function clearTouch(handlerObject){
				jQuery('body').on('click', function(){
					handlerObject.removeClass('touched closed');
					if(handlerObject.parent().attr('id') == 'categories-accordion'){
						handlerObject.children('ul').slideToggle(200);
					}
					jQuery('body').off();
				});
				handlerObject.click(function(event){
					event.stopPropagation();
				});
				handlerObject.parent().click(function(){
					handlerObject.removeClass('touched');
				});
				handlerObject.siblings().click(function(){
					handlerObject.removeClass('touched');
				});
			}
			
			var mobileDevice = true;
		}else{
			var mobileDevice = false;
		}

		//images with custom attributes
		
		if (pixelRatio > 1) {
			function brandsWidget(){
				brands = jQuery('ul.brands li a img, .product-brand a img');
				brands.css({
					'width': brands.width()/2
				});
			}
			function logoResize(){
				jQuery('header#header h2.logo, header#header h2.small_logo').each(function(){
					jQuery(this).find('a.logo img').attr('style', '');
					imgWidth = jQuery(this).find('a.logo img').width()/2;
					if(!jQuery(this).hasClass('small_logo')){
						/* logo */
						if(imgWidth <= jQuery(this).width()){
							jQuery(this).find('a.logo img').css('width', imgWidth);
						}else{
							jQuery(this).find('a.logo img').css('width', jQuery(this).width());
						}
					}else{
						/* small logo */
						if(imgWidth <= jQuery(this).parent().width()){
							jQuery(this).find('a.logo img').css('width', imgWidth);
						}else{
							jQuery(this).find('a.logo img').css('width', jQuery(this).parent().width());
						}
					}
					jQuery(this).find('a.logo img').css({
						'position': 'static',
						'opacity': '1'
					});
					if(jQuery(this).parents().hasClass('header-3')) {
						jQuery(this).css({
							'float' : 'left'
						});
					}
				});
			}
			logoResize();
			brandsWidget();
			jQuery(window).resize(function(){
				logoResize();
				brandsWidget();
			});
		}
		
		if(navigator.userAgent.match(/iPhone/i)){
			jQuery('body').addClass('iphone');
		}
    }
	
	/* Categories Accorion */
	if (jQuery('#categories-accordion').length){
		jQuery('#categories-accordion li.level-top.parent ul.level0').before('<div class="btn-cat"><i class="fa-times fa"></i><i class="fa-plus fa"></i></div>');
		if(mobileDevice == true){
			jQuery('#categories-accordion li.level-top.parent').each(function(){
				jQuery(this).on({
					click: function (){
						if(!jQuery(this).hasClass('touched')){
							jQuery(this).addClass('touched closed').children('ul').slideToggle(200);
							clearTouch(jQuery(this));
							return false;
						}
					}
				});
			});
		}else{
			jQuery('#categories-accordion li.level-top.parent .btn-cat').each(function(){
				jQuery(this).toggle(function(){
					jQuery(this).addClass('closed').next().slideToggle(200);
				},function(){
					jQuery(this).removeClass('closed').next().slideToggle(200);
				})
			});
		}
	}
	/* Categories Accorion */
	
});
var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
jQuery(document).ready(function(){
	
	closeAdd();

	if (jQuery('body').hasClass('retina-ready')) {
		if (pixelRatio > 1) {
			jQuery('img[data-srcX2]').each(function(){
				jQuery(this).attr('src',jQuery(this).attr('data-srcX2'));
			});
		}
	}
	
	/* Selects */
	if(!jQuery('body').hasClass('onepagecheckout-index-index')){
		jQuery("select:not(.super-attribute-select, .product-custom-option, .multiselect, .validate-select, #region_id)").selectbox();
	} 
	
    /* Cart Increase/Decrease Buttons */
	jQuery('.cart .qty, .my-wishlist .qty').each(function(){
		var thisQty = jQuery(this);
		
		var decreaseButton = thisQty.prev();
		decreaseButton.on('click', function(){
			if( !isNaN( thisQty.attr("value") ) && thisQty.attr("value") > 0 ){
			   var el_val = parseFloat(thisQty.attr("value"))-1;
			   thisQty.attr('value', el_val);
			}
		});
		
		var increaseButton = jQuery(this).next();
		increaseButton.on('click', function(){
			if( !isNaN(thisQty.attr("value"))){
			   var el_val = parseFloat(thisQty.attr("value"))+1; 
			   thisQty.attr('value', el_val);
		    }
		});
	});
	
/* Messages button */
	if(jQuery('ul.messages').length){
		jQuery('ul.messages > li').each(function(){
			switch (jQuery(this).attr('class')){
				case 'success-msg':
					messageIcon = '<i class="fa fa-check" />';
				break;
				case 'error-msg':
					messageIcon = '<i class="fa fa-times" />';
				break;
				case 'note-msg':
					messageIcon = '<i class="fa fa-exclamation" />';
				break;
				case 'notice-msg':
					messageIcon = '<i class="fa fa-exclamation" />';
				break;
				default:
					messageIcon = '';
			}
			jQuery(this).prepend('<div class="messages-close-btn" />', messageIcon);
			jQuery('ul.messages .messages-close-btn').on('click', function(){
				jQuery('ul.messages').remove();
			});
		});
	}
	if(jQuery('.content_bottom').length){
		jQuery('.content_bottom button#find-us').click(function() {
			jQuery('.content_bottom').toggleClass('active');
			if(jQuery('.content_bottom').hasClass('hide')){
				jQuery('.content_bottom').removeClass('hide');
			}else{
				setTimeout(function(){
					jQuery('.content_bottom').addClass('hide');
				}, 500);
			}
		});
	}
	if(jQuery('#nav-wide').length){
		jQuery('#nav-wide li.level-top').mouseenter(function(){
			jQuery(this).addClass('over');
		});
		jQuery('#nav-wide li.level-top').mouseleave(function(){
			jQuery(this).removeClass('over');
		});
	}
	
	function numerikLi(elemsLi) {
		jQuery(elemsLi).each(function(i,elem){
			var sp = jQuery(elem).children("a").children("span");
			if (sp.length) {
				var nl = "";
				i++;
				if(i < 10) nl = "0";
				sp.prepend('<em>' + nl + i + '.</em>');
			};
			var ul = jQuery(elem).children("ul");
			ul.each(function(i,e){
				numerikLi(jQuery(e).children("li"));
			});
		});
	}
	jQuery("ul#nav > li > ul").each(function(i,e){
		numerikLi(jQuery(e).children("li"));
	});
	
	jQuery('#nav-wide .menu-wrapper ul').each(function(){
		jQuery(this).children('li').each(function(index){
			index++;
			if(index < 10){nl='0';}else{nl='';};
			if(!jQuery(this).find('> a > span:not(.subtitle) em').length){
				jQuery(this).find('> a > span:not(.subtitle)').prepend('<em>' + nl + index + '.</em>');
			}
		});
	});
	
	/* floating header */
	if(jQuery('body').hasClass('floating-header')){
		headerHeight = jQuery('#header').height();
		jQuery(window).scroll(function(){
			if(jQuery(this).scrollTop() >= headerHeight ){
				if(!jQuery('#header').hasClass('floating')){
					jQuery('body').css('padding-top', headerHeight + parseFloat(jQuery('body').css('padding-top')));
					jQuery('#header').addClass('floating');
					jQuery('#header').slideDown('fast');
					menuPosition();
				}
			}
			if(jQuery(this).scrollTop() < headerHeight ){
				if(jQuery('#header').hasClass('floating')){
					jQuery('body').attr('style', '');
					jQuery('#header').removeClass('floating');
					jQuery('#header').attr('style', '');
					menuPosition();
				}
			}
		});
	}
	
	productHoverImages();
	
	/* Company Link */
	var companyLinks = jQuery('header#header dl.company-links');
	jQuery('header#header .links').each(function(){
		if(jQuery(this).parents('.company-links').length == 0){
			jQuery(this).find('li:last').prev().after('<li class="company"><dl class="company-links">' + companyLinks.html() + '</dl></li>');
		}
	});
	companyLinks.remove();
	jQuery('header#header dl.company-links').on('mouseenter mouseleave', function(){
		jQuery(this).find('dt a').toggleClass('active').parent().next('dd').slideToggle('fast');
	});
	function companyListener(e){
		var touch = e.touches[0];
		 if(jQuery(touch.target).parents('.company-links').length == 0){
			jQuery('header#header dl.company-links dd').slideUp('normal');
			document.removeEventListener('touchstart', topCartListener, false);
		}
	}
	jQuery('header#header dl.company-links dt a').on('click', function(event){
		event.stopPropagation();
		jQuery(this).parent().next('dd').slideToggle('normal');
		document.addEventListener('touchstart', companyListener, false);
		
		jQuery(document).bind('click.companyEvent', function(e){
			if (jQuery(e.target).parents('.company-links').length == 0) {
				jQuery('header#header dl.company-links dd').slideUp('normal');
				jQuery(document).unbind('click.companyEvent');
			}
		});
	});
	jQuery('.form-currency, .form-language').each(function(){
		if(jQuery(this).find('.sbHolder').length == 0){
			jQuery(this).addClass('list');
		}
	});
	
});