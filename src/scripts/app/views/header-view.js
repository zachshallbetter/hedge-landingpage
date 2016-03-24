'use strict';

import AbstractView from 'app/views/abstract-view';

import BackgroundAnimMixin from 'app/mixins/background-animation-mixin';
import ModalMixin from 'app/mixins/modal-mixin';

import { mixin, throttle } from 'core-decorators';

@mixin(BackgroundAnimMixin, ModalMixin)
export default class HeaderView extends AbstractView {
    initialize(options = {}) {
        super.initialize(options);

        this.homeLink = this.$('#headerHomeLink');
        this.downloadLink = this.$('#headerDownloadLink');

        this.initBackgroundAnimMixin();
    }

    _invalidate() {
        let myPosition = window.pageYOffset,
            myClassName = 'header__home-link--fixed';

        if (myPosition >= 70) {
            this.homeLink.classList.add(myClassName);
        } else {
            this.homeLink.classList.remove(myClassName);
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

            this.destroyBackgroundAnimMixin();

            this.downloadLink = null;
            this.homeLink = null;
        }
    }
}
