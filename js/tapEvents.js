(function( document ){
	"use strict";

	/**
	 * Tap Events Class
	 *
	 * @class TapEvents
	 * @example
	 * // Add script to your html file:
	 * // <script type="text/javascript" src="js/tapEvents.js"></script>
	 * //
	 * // Use 'tap' event:
	 *  document.getElementById('tapBtn').addEventListener('tap', function(e){
	 *		console.log('TAP - catched on #tapBtn');
	 *	}, false);
	 *
	 *  document.addEventListener('tap', function(e){
	 *		console.log('TAP - catched on document');
	 *	}, false);
	 * 
	 */
	var TapEvents = function() {
		var self = this;

		/**
		 * Define whether current event is tap or not.
		 * 
		 * @private
		 * @memberof TapEvents
		 * @type {Boolean}
		 */
		var thisIsTap = true;

		/**
		 * Will contain target element of tap event
		 * 
		 * @private
		 * @memberof TapEvents
		 * @type {Object}
		 */
		var touchstartTargetElement = null;

		/**
		 * New tap event object
		 *
		 * @private
		 * @memberof TapEvents
		 * @type {Object}
		 */
		var TapEvent = null;

		/**
		 * Event name<br>
		 * By default it's "tap", but probably in some cases you want to change it
		 *
		 * @private
		 * @memberof TapEvents
		 * @type {String}
		 */
		var tapEventName = 'tap';

		/**
		 * Class initialization
		 *
		 * @function init
		 * @public
		 * @memberof TapEvents
		 */
		this.init = function() {
			bindEvents();
			registerTapEvent();
		};

		/**
		 * Registration of basic events to the DOM
		 *
		 * @function bindEvents
		 * @private
		 * @memberof TapEvents
		 */
		function bindEvents() {

			// On touch start I'm capturing target element
			document.addEventListener('touchstart', function(e){
				thisIsTap = true;
				touchstartTargetElement = e.target;
			}, false);

			// On touch end I'm checking whether current event is tap or no
			document.addEventListener('touchend', function() {
				if ( thisIsTap && touchstartTargetElement != null && TapEvent != null ) {
					touchstartTargetElement.dispatchEvent( TapEvent );
				}
			}, false);

			// Cacelling tap event
			document.addEventListener('touchmove', cancelTouch, false);
			document.addEventListener('touchleave', cancelTouch, false);
			document.addEventListener('touchcancel', cancelTouch, false);
		};

		/**
		 * Tap event registration
		 *
		 * @function registerTapEvent
		 * @private
		 * @memberof TapEvents
		 */
		function registerTapEvent() {
			TapEvent = new Event( tapEventName );
		};

		/**
		 * Cancel that current event is touch event
		 *
		 * @function cancelTouch
		 * @private
		 * @memberof TapEvents
		 */
		function cancelTouch() {
			thisIsTap = false;
			touchstartTargetElement = null;
		};

		/**
		 * Logging function
		 *
		 * @function $log
		 * @param msg {String} - Text string to be printed in cinsole
		 * @param type {String} - Type of string, will affect it's style (font-weight, color, etc)
		 * @private
		 * @memberof TapEvents
		 */
		function $log(msg, type) {
			switch(type){
				case "b":
				case "bold":
				case "strong":
					msg = "%c" + msg;
					console.log( msg, "font-weight: 700" );
					break;
				case "log":
				default:
					console.log(msg);
					break;
			}
		};
	};

	/*
	 * Wait untill DOM is ready.
	 * All browsers except IE<9 support it.
	 */
	document.addEventListener( "DOMContentLoaded", function(){
		var _te = new TapEvents();
		_te.init();
	}, false );

})( document );