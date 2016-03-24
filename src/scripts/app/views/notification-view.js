'use strict';

import $$ from 'selectjs';
import AbstractView from 'app/views/abstract-view';
import renderTemplate from 'app/support/renderTemplate';

export default class NotificationView extends AbstractView {
    constructor(el, options = {}) {
        let myElement = renderTemplate('#notificationTemplate');
        super(myElement, options);
    }

    initialize(options = {}) {
        super.initialize(options);

        let myParent = $$('main'),
            myElement = this.$(`[data-ref='${options.ref}']`);

        if (!!myElement) {
            document.body.classList.add('has-notification');
            myElement.classList.add('notification__body-text--visible');

            myParent.insertBefore(this.el, myParent.firstChild);
        }
    }
}
