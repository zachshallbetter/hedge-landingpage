'use strict';

import assert from 'assert';

/**
 * Adds a shortcut for finding elements on the page using the querySelectorAll method. Returns the object if only one
 * result was found. Otherwise returning an array containing all found elements.
 * @param  {string} selector    String representing the element selector
 * @param  {Element} context 	Element representing the context of the query
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
