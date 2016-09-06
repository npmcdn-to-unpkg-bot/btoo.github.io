var magalterUpsellProducts = Class.create({
     
    opacityLayer: 'magalter-upsells-opacity-layer',
    productList: 'magalter-upsells-products',
    cancelButton: '.magalter-upsells-cancel-button',
    cookieName: 'magalter-upsell-rule',
    maxHeight: 400,
    
    initialize: function(listeners) { 
        
        this.listeners = listeners;         
        this.prepareListeners();
        this.calculateOffsets('magalter-upsells-products');
        this.prepareCheckboxes();
       
    },
    
    prepareListeners: function() {
        
        var listeners = this.listeners;
         
        for(i=0; i<listeners.length; i++) { 
            var patt = new RegExp(listeners[i].info, 'i'); 
            $$(listeners[i].type).each(function(object) {   
                var attribute = null;      
                var type = null;
                switch(listeners[i].type) {                   
                    case 'a':
                        attribute = object.getAttribute('href');
                        type = 'link';
                        break;
                    default:
                        attribute = object.getAttribute('onclick');
                        type = 'button';
                        break;
                }
               
                if(attribute) {       
                  
                    if(patt.test(attribute) || object.hasClassName(listeners[i].info)) {                        
                        object.onclick = function() { 
                            return false;
                        }                              
                        Event.observe(object,'click',function(event) {                                                    
                                switch(type) {
                                    case 'button':                                       
                                        $$(this.cancelButton).each(function(el) {                         
                                             if(navigator.userAgent.toLowerCase().indexOf('msie 7.0') !== -1) {                                                 
                                                  var url = this.parseUrl(attribute);
                                                  el.onclick = function() { document.location = url;  }
                                             }
                                             else {                                            
                                                el.writeAttribute('onclick', attribute);      
                                             }                                         
                                        }.bind(this));
                                        break;
                                    case 'link':                                       
                                        $$(this.cancelButton).each(function(el) {                                            
                                             el.onclick = function(){ document.location = attribute; }
                                        });                                       
                                        break;
                                    default:
                                        break;
                                } 
                           
                           $('magalter-redirect-url').value = attribute;                            
                            // show layer
                            this.showLayer(true);
                            
                            this.setCookie();
                      
                            Event.stop(event);                       
                        }.bind(this));
                    }                               
                }
            }.bind(this));           
        }       
    },
    
    parseUrl: function(attribute) {
        
        return /((http:).+)(';$|";$|"$|'$)/ig.exec(attribute)[1];  
        
    },
    
    setCookie: function() {
        
        var now = new Date();            
        now.setTime(now.getTime() + 3600 * 1000 * 24 * 365);
        
        var cookie = Mage.Cookies.get(this.cookieName);
        var identity = $('rule-identity').value;
        
        if(!identity) {
            return false;
        }

       var data = identity.split(',');
     
       if(!data[1]) {
           return false;
       }        
        if(!cookie) {            
            Mage.Cookies.set(this.cookieName, identity, now, '/');            
        }
        else { 
           Mage.Cookies.set(this.cookieName, cookie + ',' + data[0], now, '/'); 
        }         
    },
    
    showLayer: function(bool) {
        
        if(bool) {
            Effect.Appear($(this.opacityLayer), {
                from: 0, 
                to: 0.4, 
                duration: 0.6
            });    
            Effect.Appear($(this.productList), {
                duration: 0.6
            });    
        }        
        else {
            Effect.Fade($(this.opacityLayer));   
            Effect.Fade($(this.productList));   
        }
       
    },
   
    calculateOffsets: function(id) {
     
        var offsets = document.viewport.getDimensions();  
        var formDimensions = $(id).getDimensions();        
        var scrollOffsets = document.viewport.getScrollOffsets();
         
        if(formDimensions.height > this.maxHeight) {
          $(id).setStyle({               
            overflow: 'auto',
            height: this.maxHeight + 'px'
          });
          formDimensions.height = this.maxHeight;
        }
 
        var  topOffset = (parseInt(offsets.height) / 2) - (parseInt(formDimensions.height) / 1.5) + parseInt(scrollOffsets.top);          
        var  leftOffset = (parseInt(offsets.width) / 2) - (parseInt(formDimensions.width) / 2) + parseInt(scrollOffsets.left);
     
        $(id).setStyle({               
            top: topOffset + 'px',
            left: leftOffset + 'px'
        });       
        
    },    
    
    prepareCheckboxes: function() {
         
         $$('.magalter-related-checkbox').each(function(elem){
            Event.observe(elem, 'click', function() {                
                var checkboxes = $$('.magalter-related-checkbox');
                var values = [];
                for(var i=0;i<checkboxes.length;i++){
                    if(checkboxes[i].checked) values.push(checkboxes[i].value);
                }
                if($('magalter-hidden-upsells')){
                    $('magalter-hidden-upsells').value = values.join(',');
                } 
            })
        }); 
         
    } 
});