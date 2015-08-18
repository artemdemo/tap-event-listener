// Some JShint globals:
/* global document, console, Event*/
(function (document, window) {
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
	window.TapEvents = (function () {
		var TapEventMain = {};

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
		 * @type {Event}
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
		 * For long tapping events it can be useful o set timeout
		 * @private
		 * @memberof TapEvents
		 * @type {number}
		 */
		var eventTimeout = 0;

		var timeoutID = null;

		/**
		 * Class initialization
		 *
		 * @function init
		 * @public
		 * @memberof TapEvents
		 */
		TapEventMain.init = function(options) {
			if ( options.hasOwnProperty('eventTimeout') ) eventTimeout = options.eventTimeout;
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
				if ( eventTimeout > 0 ) {
					timeoutID = setTimeout(function(){
						timeoutID = null;
						if ( thisIsTap && touchstartTargetElement !== null && TapEvent !== null ) {
							touchstartTargetElement.dispatchEvent( TapEvent );
						}
					}, eventTimeout);
				}
			}, false);

			// On touch end I'm checking whether current event is tap or no
			document.addEventListener('touchend', function() {
				if ( thisIsTap && touchstartTargetElement !== null && TapEvent !== null && eventTimeout === 0 ) {
					touchstartTargetElement.dispatchEvent( TapEvent );
				}
			}, false);

			// Cancelling tap event
			document.addEventListener('touchmove', cancelTouch, false);
			document.addEventListener('touchleave', cancelTouch, false);
			document.addEventListener('touchcancel', cancelTouch, false);
		}

		/**
		 * Tap event registration
		 *
		 * @function registerTapEvent
		 * @private
		 * @memberof TapEvents
		 */
		function registerTapEvent() {
			TapEvent = new Event( tapEventName );
		}

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
			if ( !! timeoutID ) clearTimeout(timeoutID);
			timeoutID = null;
		}

		return TapEventMain;

	})();

})( document, window );