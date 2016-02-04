'use strict';

// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
export default function isInViewport(element, offset = 0) {
	if (!element) {
		return false;
	}

	let { top, bottom } = element.getBoundingClientRect();
	if (top === 0 && bottom === 0) {
		return false;
	}

	let myTop = (window.innerHeight || document.documentElement.clientHeight) - offset,
		myBottom = offset;

	let myVisible = top <= myTop && bottom >= myBottom;

	return myVisible;
};
