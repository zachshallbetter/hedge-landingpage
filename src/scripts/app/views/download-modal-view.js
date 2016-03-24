'use strict';

import AbstractModalView from 'app/views/abstract-modal-view';
import FormMixin from 'app/mixins/form-mixin';

import { mixin } from 'core-decorators';

@mixin(FormMixin)
export default class DownloadModalView extends AbstractModalView {
    constructor(options = {}) {
        options.template = '#downloadModalTemplate';
        super(options);
    }

    initialize(options) {
        super.initialize(options);

        this.newsletterForm = this.$('#downloadNewsletterForm');
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
