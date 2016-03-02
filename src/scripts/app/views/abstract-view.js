'use strict';

import Logdown from 'logdown';
import QueryMixin from 'app/mixins/query-mixin';
import isVisible from 'visiblejs';

import assert from 'assert';
import { mixin } from 'core-decorators';
import { extend, uniqueId, defaults, pick } from 'lodash';

@mixin(QueryMixin)
export default class AbstractView {
    constructor(el, options = {}) {
        if (el instanceof Node) {
            this.el = el;
        }

        options = defaults(options, { cid: this.constructor.name });

        this.cid = uniqueId(options.cid);
        this.logger = new Logdown({ prefix: 'Views' });

        this.initialize(options);
        this.enable();
    }

    /**
     * Initializes the AbstractView
     * @param  {object} options Object representing the options sent to the AbstractView
     */
    initialize(options) {
        this.logger.log(`Initializing \`${this.cid}\``);

        this.enabled = false;
        this.destroyed = false;

        options = defaults(options, {
            path: this.el.id || '/',
            jumpOffset: 0,
        });

        let myViewOptions = pick(options, ['path', 'jumpOffset']);
        extend(this, myViewOptions);
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
