'use strict';

import Logdown from 'logdown';
import Jump from 'jump.js';
import $$ from 'selectjs';

import { debounce, throttle } from 'core-decorators';
import { find, findLast, trim, uniqueId } from 'lodash';

import BenefitsView from 'app/views/benefits-view';
import CaseView from 'app/views/case-view';
import HeaderView from 'app/views/header-view';
import FeaturesView from 'app/views/features-view';
import FooterView from 'app/views/footer-view';
import NavigationView from 'app/views/navigation-view';
import PricingView from 'app/views/pricing-view';
import ReminderView from 'app/views/reminder-view';

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
        this._initView(myNavigation);

        this._setCurrentView();
        this.enable();
    }

    /**
     * Initializes a View class specific for a DOM element
     * @param  {node} element Node object represnting the element
     */
    _initView(element) {
        // Return a previous instantiated view when found
        let myView = this._subviews.get(element);
        if (!!myView) {
            return myView;
        }

        // Otherwise instantiate a new view using the element its classname
        let myClass = element.classList.item(0);
        switch (myClass) {
            case 'benefits': myView = new BenefitsView(element); break;
            case 'case': myView = new CaseView(element); break;
            case 'header': myView = new HeaderView(element); break;
            case 'features': myView = new FeaturesView(element); break;
            case 'footer': myView = new FooterView(element); break;
            case 'navigation': myView = new NavigationView(element); break;
            case 'pricing': myView = new PricingView(element); break;
            case 'reminder': myView = new ReminderView(element); break;
        }

        // Do nothing when no view was instantiated
        if (!myView) {
            return;
        }

        // Store the view
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
            let { top } = element.getBoundingClientRect();
            return top <= myOffset;
        });

        // Nothing was found
        if (!myElement) {
            return;
        }

        // Get the current view
        this._currentView = this._initView(myElement);
    }

    /**
     * Invoked when the user stops scrolling. It sets the state of the History according the current view.
     */
    _replaceState() {
        if (!this._currentView) {
            return;
        }

        const Router = require('app/router');
        Router.default.navigate(this._currentView.path);
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
            this._currentView = this._initView(myElement);
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
