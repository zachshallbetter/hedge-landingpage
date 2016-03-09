'use strict';

import AbstractView from 'app/views/abstract-view';
import FormMixin from 'app/mixins/form-mixin';

import { mixin } from 'core-decorators';

@mixin(FormMixin)
export default class FooterView extends AbstractView {
    initialize(options = {}) {
        super.initialize(options);

        this.newsletterForm = this.$('.footer__newsletter-form');
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
