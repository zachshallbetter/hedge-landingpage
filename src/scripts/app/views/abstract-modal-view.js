'use strict';

import $$ from 'selectjs';
import AbstractView from 'app/views/abstract-view';

import createElementFromString from 'app/support/createElementFromString';
import { trim } from 'lodash';

export default class AbstractModalView extends AbstractView {
    constructor(el, options = {}) {
        let myTemplate = $$('#download-modal-template').innerHTML,
            myElement = createElementFromString(trim(myTemplate));

        super(myElement, options);
    }

    initialize(options = {}) {
        super.initialize(options);
        document.body.appendChild(this.el);
    }

    _onClick(event) {
        if (event.target === this.el) {
            this.emit('dismiss');
        }
    }

    enable() {
        if (!this.enabled) {
            super.enable();
            this.el.on('click', this._onClick.bind(this));
        }
    }

    destroy() {
        if (!this.destroyed) {
            document.body.removeChild(this.el);

            super.destroy();
            this.removeAllListeners('dismiss');
        }
    }
}
