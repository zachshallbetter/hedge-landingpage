'use strict';

import AbstractView from 'app/views/abstract-view';
import renderTemplate from 'app/support/renderTemplate';

export default class NotificationView extends AbstractView {
    constructor(el, options = {}) {
        let myElement = renderTemplate('#notification-template');
        super(myElement, options);
    }

    initialize(options = {}) {
        super.initialize(options);
        this.$(`[data-ref='${options.ref}']`).classList.add('notification__body-text--visible');

        let myParent = $$('main');
        myParent.insertBefore(this.el, myParent.firstChild);
    }
}
