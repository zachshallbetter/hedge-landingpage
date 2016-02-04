'use strict';

import Logdown from 'logdown';
import $ from 'app/support/query';

import { autobind } from 'core-decorators';
import { extend, uniqueId, defaults, pick } from 'lodash';

import * as ColorSchemes from 'app/constants/colorschemes';

export default class AbstractView {
    constructor(el, options = {}) {
        options = defaults(options, { id: this.constructor.name });

        this.id = uniqueId(options.id);
        this.logger = new Logdown({ prefix: 'Views' });

        if (el instanceof Node) {
            this.el = el;
        }

        this.initialize(options);
        this.lazyload(true);
        this.enable();
    }

    /**
     * Initializes the AbstractView
     * @param  {object} options Object representing the options sent to the AbstractView
     */
    initialize(options) {
        options = defaults(options, { path: this.el.id, });

        let myViewOptions = pick(options, ['path']);
        extend(this, myViewOptions);

        this.enabled = false;
        this.destroyed = false;
    }

    /**
     * Enables the AbstractView. Add your listeners here.
     */
    enable() {
        if (!this.enabled) {
            this.enabled = true;
        }
    }

    /**
     * Disables the AbstractView. Remove your listeners here.
     */
    disable() {
        if (this.enabled) {
            this.enabled = false;
        }
    }

    /**
     * Helper function to query for elements within this views
     * @param  {String} selector String representing the selector
     */
    $(selector, returnSet = false) {
        if (!this.el) {
            return alwaysReturnAsSet ? [] : null;
        }

        return $(selector, this.el, returnSet);
    }

    /**
     * Destroys the view
     */
    destroy() {
        if (!this.destroyed) {
            this.destroyed = true;
            this.disable();

            this.el = null;
        }
    }
};
