'use strict';

import Logdown from 'logdown';
import DownloadModalView from 'app/views/download-modal-view';

import { uniqueId } from 'lodash';
import * as ModalTypes from 'app/constants/modal-types';

class Modals {
    constructor() {
        this.cid = uniqueId('Modals');
        this.logger = new Logdown({ prefix: 'Modals' });

        this.initialize();
        window.on('keydown', this._onKeyDown.bind(this));
    }

    initialize() {
        this.logger.log(`Initializing \`${this.cid}\``);
    }

    /**
     * Presents a modal. A modal is only shown when no other is active.
     * @param  {string} type    String representing the modal type
     */
    presentModal(type, options = {}) {
        if (!!this._currentModal) {
            return;
        }

        switch (type) {
            case ModalTypes.DOWNLOAD:
                this._currentModal = new DownloadModalView(options);
                break;
        }

        this._currentModal.on('dismiss', () => this.dismissCurrentModal());
    }

    /**
     * Dismisses the current modal. Does nothing when no modal is active.
     */
    dismissCurrentModal() {
        if (!this._currentModal) {
            return;
        }

        this._currentModal.destroy();
        this._currentModal = null;
    }

    /**
     * Executes when the user presses the keyboards
     * @param  {event} event Event which triggers the handler
     */
    _onKeyDown(event) {
        if (event.keyCode === 27) {
            this.dismissCurrentModal();
        }
    }
}

export default new Modals();
