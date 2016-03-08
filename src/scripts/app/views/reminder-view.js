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
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();
            this.destroyBackgroundAnimMixin();
        }
    }
}
