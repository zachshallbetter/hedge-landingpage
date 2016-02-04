'use strict';

import Logdown from 'logdown';
import Jump from 'jump.js';
import $ from 'app/support/query';

import { autobind, debounce, throttle } from 'core-decorators';
import { find, findLast, uniqueId } from 'lodash';

export default class Controller {
    constructor() {
        this.id = uniqueId('Controller');
        this.logger = new Logdown({ prefix: 'Controller' });

        this.initialize();
        this.enable();
    }

    /**
     * Executes when the Controller is instantiated
     */
    initialize() {
        this.logger.log(`Initializing \`${this.id}\``);

        this.scrolling = false;
        this.resizing = false;

        this.root = $('main#hedge');
        this._subviews = [];

        this.enable();
        document.body.classList.add('ready');
    }

    _setCurrentView(pushState = false) {
        // Find the currently active view
        let myOffset = (window.innerHeight || document.documentElement.clientHeight);

        // Get the view which is in the viewport
        let myChild = findLast(this.root.children, (child) => {
            let { top } = child.getBoundingClientRect();
            return top <= myOffset * 0.5;
        });

        // Stop here if no view was found
        if (!myChild) {
            return;
        }

        console.log(myChild);
    }

    _replaceState() {
        if (!this._currentView) {
            return;
        }

        var Router = require('app/router');
        Router.default.navigate(this._currentView.path);
    }

    showView(path, animate = true) {
        let myView = find(this._subviews, (view) => view.path === path);
        if (!myView) {
            return;
        }

        this._currentView = myView;
        this._currentView.el.scrollIntoView(animate);
    }

    /**
     * Executes when the user starts scrolling
     * @param  {event} event Event which triggers the method
     */
     @debounce(250, true)
    _onScrollStart(event) {
        document.body.classList.add('scrolling');
    }

    /**
     * Executes while the user scrolls the pages
     * @param  {event} event Event which triggers the handler
     */
     @throttle(100)
    _onScroll(event) {
        this._setCurrentView();
    }

    /**
     * Executes when the user stops scrolling
     * @param  {event} event Event which triggers the method
     */
     @debounce(250)
    _onScrollEnd(event) {
        document.body.classList.remove('scrolling');
        this._replaceState();
    }

    /**
     * Executes when the user starts resizing the window
     * @param  {event} event Event which triggers the method
     */
     @debounce(500, true);
    _onResizeStart(event) {
        document.body.classList.add('resizing');
    }

    /**
     * Executes when the user resizes the window
     * @param  {event} event Event which triggers the method
     */
     @throttle(250)
    _onResize(event) {
        this._setCurrentView();
    }

    /**
     * Executes when the user stops resizing the window
     * @param  {event} event Event which triggers the method
     */
     @debounce(500);
    _onResizeEnd(event) {
        document.body.classList.remove('resizing');
        this._replaceState();
    }

    enable() {
        window.on(`scroll`, this._onScrollStart.bind(this));
        window.on(`scroll`, this._onScroll.bind(this));
        window.on(`scroll`, this._onScrollEnd.bind(this));

        window.on(`resize`, this._onResizeStart.bind(this));
        window.on(`resize`, this._onResize.bind(this));
        window.on(`resize`, this._onResizeEnd.bind(this));
    }
};
