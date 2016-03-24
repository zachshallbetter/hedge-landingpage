'use strict';

import AbstractView from 'app/views/abstract-view';

import BackgroundAnimMixin from 'app/mixins/background-animation-mixin';
import ModalMixin from 'app/mixins/modal-mixin';

import { mixin } from 'core-decorators';

@mixin(BackgroundAnimMixin, ModalMixin)
export default class ReminderView extends AbstractView {
    initialize(options = {}) {
        super.initialize(options);
        this.initBackgroundAnimMixin();

        this.downloadLink = this.$('.reminder__download-link');
    }

    _onDownloadClick(event) {
        event.preventDefault();
        window.ga('send', 'pageview', event.currentTarget.getAttribute('href'));

        this.presentDownloadModal();
    }

    enable() {
        if (!this.enabled) {
            super.enable();
            this.downloadLink.on('click', this._onDownloadClick.bind(this));
        }
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();
            this.destroyBackgroundAnimMixin();

            this.downloadLink = null;
        }
    }
}
