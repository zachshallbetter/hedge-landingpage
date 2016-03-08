'use strict';

import AbstractView from 'app/views/abstract-view';
import ModalMixin from 'app/mixins/modal-mixin';

import { mixins, throttle } from 'core-decorators';

@mixins(ModalMixin)
export default class NavigationView extends AbstractView {
    initialize(options = {}) {
        super.initialize(options);
        this.downloadLink = this.$('.navigation__link--download');
    }

    _invalidate() {
        let myPosition = window.pageYOffset,
            myClassName;

        myClassName = 'navigation--fixed';
        if (myPosition >= 70) {
            this.el.classList.add(myClassName);
        } else {
            this.el.classList.remove(myClassName);
        }

        myClassName = 'navigation--activated';
        if (myPosition >= 250) {
            this.el.classList.add(myClassName);
        } else {
            this.el.classList.remove(myClassName);
        }
    }

    _onDownloadLink(event) {
        event.preventDefault();
        this.presentDownloadModal();
    }

    /**
     * Executes while the user scrolls the pages
     * @param  {event} event Event which triggers the handler
     */
     @throttle(50)
    _onScroll(event) {
        this._invalidate();
    }

    enable() {
        if (!this.enabled) {
            super.enable();

            this.downloadLink.on('click', this._onDownloadLink.bind(this));
            window.on('scroll', this._onScroll.bind(this));
        }
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();
            this.downloadLink = null;
        }
    }
}
