/*
*
* jRails ajax extras
* version 0.1
* <aaron@ennerchi.com> | http://www.ennerchi.com
* 
*/

(function($) {
	$().ajaxSend(function(a, xhr, s){ //Set request headers globally
		xhr.setRequestHeader("Accept", "text/javascript, text/html, application/xml, text/xml, */*");
	});
})(jQuery);


/*
*
* jRails form extras
* <aaron@ennerchi.com> | http://www.ennerchi.com
* 
*/

// reset a form
(function($) {
	$.fn.reset = function() {
		return this.each(function() {
			// guard against an input with the name of 'reset'
			// note that IE reports the reset function as an 'object'
			if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
				this.reset();
		});
	};
})(jQuery);

/*
*
* jRails form observer plugin
* version 0.2
* <aaron@ennerchi.com> | http://www.ennerchi.com
* 
*/

(function($) {
	$.extend({ // Translate field to event
		fieldEvent: function(el, obs) {
			var field = el[0] || el, e = 'change';
			if (field.type == 'radio' || field.type == 'checkbox') e = 'click';
			else if (obs && field.type == 'text' || field.type == 'textarea') e = 'keyup';
			return e;
		}
	});
	$.fn.extend({ // Delayed observer for fields and forms
		delayedObserver: function(delay, callback){
			var el = $(this);
			if (typeof window.delayedObserverStack == 'undefined') window.delayedObserverStack = [];
			if (typeof window.delayedObserverCallback == 'undefined') {
				window.delayedObserverCallback = function(stackPos) {
					observed = window.delayedObserverStack[stackPos];
					if (observed.timer) clearTimeout(observed.timer);   
					observed.timer = setTimeout(function(){
						observed.timer = null;
						observed.callback(observed.obj, observed.obj.formVal());
					}, observed.delay * 1000);
					observed.oldVal = observed.obj.formVal();
				}
			}
			window.delayedObserverStack.push({
				obj: el, timer: null, delay: delay, 
				oldVal: el.formVal(), callback: callback
			});     
			var stackPos = window.delayedObserverStack.length-1;
			if (el[0].tagName == 'FORM') {
				$(':input', el).each(function(){
					var field = $(this);
					field.bind($.fieldEvent(field, delay), function(){
						observed = window.delayedObserverStack[stackPos];
						if (observed.obj.formVal() == observed.obj.oldVal) return;
						else window.delayedObserverCallback(stackPos);
					});
				});
			} else {
				el.bind($.fieldEvent(el, delay), function(){
					observed = window.delayedObserverStack[stackPos];
					if (observed.obj.formVal() == observed.obj.oldVal) return;
					else window.delayedObserverCallback(stackPos);
				});
			};
		},
		formVal: function() { // Gets form values
			var el = this[0];
			if(el.tagName == 'FORM') return this.serialize();
			if(el.type == 'checkbox' || self.type == 'radio') return this.filter('input:checked').val() || '';
			else return this.val();
		}
	});
})(jQuery);

/*
*
* jRails visual effects stubs
* version 0.1
* <aaron@ennerchi.com> | http://www.ennerchi.com
* 
*/

(function($) {
	/* Support a fadeToggle */
	$.fn.fadeToggle = function(speed, easing, callback) {
		return this.animate({opacity: 'toggle'}, speed, easing, callback);
	};

	$.fn.extend({
		visualEffect : function(o) {
			e = o.replace(/(.)?/, function(m, l) { return l.toUpperCase() }).replace(/\_(.)/g, function(m, l){return l.toUpperCase()});
			return eval('$(this).'+e+'()');
		},
		Appear : function(speed, callback) {
			return this.fadeIn(speed, callback);
		},
		BlindDown : function(speed, callback) {
			return this.show('blind', { direction: 'vertical' }, speed, callback);
		},
		BlindUp : function(speed, callback) {
			return this.hide('blind', { direction: 'vertical' }, speed, callback); 
		},
		BlindRight : function(speed, callback) {
			return this.show('blind', { direction: 'horizontal' }, speed, callback); 
		},
		BlindLeft : function(speed, callback) {
			this.hide('blind', { direction: 'horizontal' }, speed, callback); 
			return this;
		},
		DropOut : function(speed, callback) {
			return this.hide('drop', {direction: 'down' }, speed, callback); 
		},
		DropIn : function(speed, callback) {
			return this.show('drop', { direction: 'up' }, speed, callback); 
		},
		Fade : function(speed, callback) {
			return this.fadeOut(speed, callback);
		},
		Fold : function(speed, callback) {
			return this.hide('fold', {}, speed, callback); 
		},
		FoldOut : function(speed, callback) {
			return this.show('fold', {}, speed, callback); 
		},
		Grow : function(speed, callback) {
			return this.show('scale', {}, speed, callback); 
		},
		Highlight : function(speed, callback) {
			return this.show('highlight', {}, speed, callback); 
		},
		Puff : function(speed, callback) {
			return this.hide('puff', {}, speed, callback); 
		},
		Pulsate : function(speed, callback) {
			return this.show('pulsate', {}, speed, callback); 
		},
		Shake : function(speed, callback) {
			return this.show('shake', {}, speed, callback); 
		},
		Shrink : function(speed, callback) {
			return this.hide('scale', {}, speed, callback); 
		},
		Squish : function(speed, callback) {
			return this.hide('scale', { origin: ['top', 'left'] }, speed, callback); 
		},
		SlideUp : function(speed, callback) {
			return this.hide('slide', { direction: 'up'}, speed, callback); 
		},
		SlideDown : function(speed, callback) {
			return this.show('slide', { direction: 'up'}, speed, callback); 
		},
		SwitchOff : function(speed, callback) {
			return this.hide('clip', {}, speed, callback); 
		},
		SwitchOn : function(speed, callback) {
			return this.show('clip', {}, speed, callback); 
		}
	});
})(jQuery);
