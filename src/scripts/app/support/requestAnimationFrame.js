'use strict';

/**
 * Polyfill for requestAnimationFrame
 */
export const raf = window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame.bind(window) || window.msRequestAnimationFrame.bind(window) || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
};

/**
 * Polyfill for cancelAnimationFrame
 */
export const caf = window.cancelAnimationFrame.bind(window) || window.mozCancelAnimationFrame.bind(window) || window.webkitCancelAnimationFrame.bind(window) || window.msCancelAnimationFrame.bind(window) || function (id) {
    window.clearTimeout(id);
};
