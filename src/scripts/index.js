'use strict';

// Global imports
import Array from 'arrayjs';
import Listen from 'listenjs';

// Polyfills
require('viewport-units-buggyfill');
require('svg4everybody')();
require('picturefill');

// Make the website visible
window.on('load', (event) => {
    require('app/router');
    document.body.classList.add('ready');
});
