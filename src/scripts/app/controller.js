'use strict';

import Logdown from 'logdown';
import Jump from 'jump.js';
import $$ from 'selectjs';

import { debounce, throttle } from 'core-decorators';
import { find, findLast, trim, uniqueId } from 'lodash';

const Views = require('./views/*.js', { mode: 'hash' });

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

        let myNavigation = $$('.navigation');
        this._lazyInitView(myNavigation);

        this._setCurrentView();
        this.enable();
    }

    /**
     * Initializes a View class specific for a DOM element
     * @param  {node} element Node object represnting the element
     */
    _lazyInitView(element) {
        let myView = this._subviews.get(element);

        // Return view when it was already instantiated
        if (!!myView) {
            return myView;
        }

        // Otherwise get the View Class using the classname of the element
        let myClass = element.classList.item(0);
        const View = Views[`${myClass}-view`];

        // Stop when no Class was found
        if (!View) {
            return;
        }

        // Instantiate and store the View object
        myView = new View.default(element);
        this._subviews.set(element, myView);

        return myView;
    }

    /**
     * Sets the currentview while scrolling through the page
     */
    _setCurrentView() {
        // Get the height of the document/window
        let myOffset = (window.innerHeight || document.documentElement.clientHeight) * 0.5;

        // Get the view which most visible in the viewport
        let myElement = findLast(this.root.children, (element) => {
            let { top, width, height } = element.getBoundingClientRect();
            return width > 0 && height > 0 && top <= myOffset;
        });

        // Nothing was found
        if (!myElement) {
            return;
        }

        // Get the current view
        this._currentView = this._lazyInitView(myElement);
    }

    /**
     * Invoked when the user stops scrolling. It sets the state of the History according the current view.
     */
    _replaceState() {
        if (!this._currentView) {
            return;
        }

        const Router = require('app/router');
        Router.default.navigate(`${this._currentView.path}${window.location.search}`);
    }

    /**
     * Jumps to a view on the page
     */
    showElement(path, animate = false) {
        let mySelector = `#${trim(path, '/')}`,
            myOffset = 0,
            myElement = this.root;

        if (mySelector !== '#') {
            myElement = $$(mySelector, this.root);
        } else {
            mySelector = '#hedge';
        }

        if (!!myElement) {
            this._currentView = this._lazyInitView(myElement);
            myOffset = !!this._currentView ? this._currentView.jumpOffset : 0;
        }

        if (!animate) {
            myElement.scrollIntoView();
        } else {
            const Scroller = new Jump();
            Scroller.jump(mySelector, {
                duration: 500,
                easing: (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b,
                offset: myOffset,
            });
        }
    }

    showNotification(ref) {
        document.body.classList.add('has-notification');

        let myElement = $$('.notification', this.root);
        if (!myElement) {
            return;
        }

        const View = Views['notification-view'];
        let myView = new View.default(myElement, { ref: ref });

        this._subviews.set(myElement, myView);
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
