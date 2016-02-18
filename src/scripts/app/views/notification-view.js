'use strict';

import AbstractView from 'app/views/abstract-view';

export default class NotificationView extends AbstractView {
    initialize(options = {}) {
        super.initialize(options);

        let myNotification = this.$(`[data-ref='${options.ref}']`);
        myNotification.classList.add('notification__body-text--visible');
    }
}
