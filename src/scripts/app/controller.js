'use strict';

import Logdown from 'logdown';
import Jump from 'jump.js';
import $$ from 'selectjs';

import { autobind, debounce, throttle } from 'core-decorators';
import { find, findLast, uniqueId } from 'lodash';

import HeaderView from 'app/views/header-view';
import FooterView from 'app/views/footer-view';

export default class Controller {
    constructor() {
        this.cid = uniqueId('Controller');
        this.logger = new Logdown({ prefix: 'Controller' });

        this.initialize();
        this.enable();
    }

    /**
     * Executes when the Controller is instantiated
     */
    initialize() {
        this.logger.log(`Initializing \`${this.cid}\``);

        this.scrolling = false;
        this.resizing = false;

        this.root = $$('#hedge');
        this._subviews = new Map();

        this._setCurrentView();
        this.enable();

        document.body.classList.add('ready');
    }

    _initView(element) {
        // Return a previous instantiated view when found
        let myView = this._subviews.get(element);
        if (!!myView) {
            return myView;
        }

        // Otherwise instantiate a new view using the element its classname
        let myClass = element.classList.item(0);
        switch (myClass) {
            case 'header': myView = new HeaderView(element); break;
            case 'footer': myView = new FooterView(element); break;
        }

        // Do nothing when no view was instantiated
        if (!myView) {
            return;
        }

        // Store the view
        this._subviews.set(element, myView);

        return myView;
    }

    _setCurrentView() {
        // Get the height of the document/window
        let myOffset = (window.innerHeight || document.documentElement.clientHeight);

        // Get the view which most visible in the viewport
        let myElement = findLast(this.root.children, (element) => {
            let { top } = element.getBoundingClientRect();
            return top <= myOffset * 0.5;
        });

        // Nothing was found
        if (!myElement) {
            return;
        }

        // Get the current view
        this._currentView = this._initView(myElement);
    }

    _replaceState() {
        if (!this._currentView) {
            return;
        }

        const Router = require('app/router');
        Router.default.navigate(this._currentView.path);
    }

    showView(path, animate = true) {
        let myView = find(this._subviews, (view) => view.path === path);
        if (!myView) {
            return;
        }

        this._currentView = myView;

        if (animate) {
        }
        else {
            this._currentView.el.scrollIntoView();
        }
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
