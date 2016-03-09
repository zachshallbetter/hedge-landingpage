'use strict';

import AbstractModalView from 'app/views/abstract-modal-view';
import FormMixin from 'app/mixins/form-mixin';

import { mixin } from 'core-decorators';

@mixin(FormMixin)
export default class DownloadModalView extends AbstractModalView {
    constructor(options = {}) {
        options.template = '#download-modal-template';
        super(options);
    }

    initialize(options) {
        super.initialize(options);

        this.newsletterForm = this.$('.download-modal__newsletter-form');
        this.initFormMixin(this.newsletterForm);
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();

            this.destroyFormMixin();
            this.newsletterForm = null;
        }
    }
}
