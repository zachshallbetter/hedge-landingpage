'use strict';

import assert from 'assert';

/**
 * Adds a shortcut for finding elements on the page using the querySelectorAll method. Returns the object if only one
 * result was found. Otherwise returning an array containing all found elements.
 * @param  {string} selector    String representing the element selector
 */
export default function query(selector, context = null, returnSet = false) {
	assert(typeof selector === 'string', 'Required argument "selector" is not a String or undefined');

	let myResult;
	if (context instanceof Node) {
        myResult = context.querySelectorAll(selector);
	} else {
		myResult = document.querySelectorAll(selector);
	}

	if (myResult.length == 0) {
		return returnSet ? [] : null;
	}

	return myResult.length === 1 && !returnSet ? myResult[0] : myResult;
}

/**
 * Adds addEventListener function to NodeList objects
 * @param  {[type]}   eventName String representing the event name to listen to
 * @param  {function} handler   Function which is executed if the event is triggered
 */
NodeList.prototype.addEventListener = function(eventName, handler) {
    [].forEach.call(this, (element) => {
        element.addEventListener(eventName, handler);
    });
};

/**
 * Adds removeEventListener function to NodeList objects
 * @param  {[type]}   eventName String representing the event name to listen to
 * @param  {function} handler   Function which is executed if the event is triggered
 */
NodeList.prototype.addEventListener = function(eventName, handler) {
	[].forEach.call(this, (element) => {
        element.removeEventListener(eventName, handler);
    });
};

/**
 * Adds shortcuts for the addEventListener methods
 * @param  {[type]}   eventName String representing the event name to listen to
 * @param  {function} handler   Function which is executed if the event is triggered
 */
NodeList.prototype.on = Node.prototype.on = window.on = function(eventName, handler) {
    this.addEventListener(eventName, handler);
};

/**
 * Adds shortcuts for the removeEventListener methods
 * @param  {[type]}   eventName String representing the event name to listen to
 * @param  {function} handler   Function which is executed if the event is triggered
 */
NodeList.prototype.off = Node.prototype.off = window.off = function(eventName, handler) {
    this.removeEventListener(eventName, handler);
};
