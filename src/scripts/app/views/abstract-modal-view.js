'use strict';

import assert from 'assert';

import AbstractView from 'app/views/abstract-view';
import renderTemplate from 'app/support/renderTemplate';

export default class AbstractModalView extends AbstractView {
    constructor(options = {}) {
        assert(typeof options.template === 'string', 'Required option template is undefined');

        let myElement = renderTemplate(options.template);
        super(myElement, options);
    }

    initialize(options = {}) {
        super.initialize(options);
        document.body.appendChild(this.el);
    }

    /**
     * Executes when the user clicks the modal
     * @param  {event} event Event which triggers the handler
     */
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
