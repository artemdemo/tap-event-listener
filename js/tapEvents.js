(function( window ){
	"use strict";

	/**
	 * Tap Events Class
	 *
	 * @class TapEvents
	 */
	var TapEvents = function() {
		var self = this;

		/**
		 * Class initialization
		 *
		 * @function init
		 * @public
		 * @memberof TapEvents
		 */
		this.init = function() {
			registerEvents();
		};

		/**
		 * Registration of basic events to the DOM
		 *
		 * @function registerEvents
		 * @private
		 * @memberof TapEvents
		 */
		function registerEvents() {
			$log('Events registration');
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

	window.onload = function() {
		var _te = new TapEvents();
		_te.init();
	}

})( window );