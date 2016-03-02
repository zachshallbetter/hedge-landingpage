'use strict';

import $$ from 'selectjs';
import AbstractView from 'app/views/abstract-view';

import createElementFromString from 'app/support/createElementFromString';
import { trim } from 'lodash';

export default class NotificationView extends AbstractView {
    constructor(el, options = {}) {
        let myTemplate = $$('#notification-template').innerHTML,
            myElement = createElementFromString(trim(myTemplate));

        super(myElement, options);
    }

    initialize(options = {}) {
        super.initialize(options);
        this.$(`[data-ref='${options.ref}']`).classList.add('notification__body-text--visible');

        let myParent = $$('main');
        myParent.insertBefore(this.el, myParent.firstChild);
    }
}
