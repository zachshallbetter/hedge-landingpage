'use strict';

// Polyfills
import ViewportUnits from 'viewport-units-buggyfill';
import SVGFill from 'svg4everybody';
import Picturefill from 'picturefill';
import Array from 'arrayjs';
import Listen from 'listenjs';

SVGFill();

// Initialize Router
import Router from 'app/router';

// Make the website visible
document.body.classList.add('ready');
