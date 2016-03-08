'use strict';

import Logdown from 'logdown';
import ModalView from 'app/views/abstract-modal-view';

import { uniqueId } from 'lodash';

class Modals {
    constructor() {
        this.cid = uniqueId('Modals');
        this.logger = new Logdown({ prefix: 'Modals' });

        this.initialize();
        this.enable();
    }

    initialize() {
        this.logger.log(`Initializing \`${this.cid}\``);
    }

    presentModal(type) {
        if (!!this._currentModal) {
            return;
        }

        this.logger.log(`Presenting ModalType \`${type}\``);
        document.body.classList.add('has-popup');

        this._currentModal = new ModalView();
        this._currentModal.on('dismiss', () => this.dismissCurrentModal());
    }

    dismissCurrentModal() {
        if (!!this._currentModal) {
            document.body.classList.remove('has-popup');

            this._currentModal.destroy();
            this._currentModal = null;
        }
    }

    _onKeyDown(event) {
        if (event.keyCode === 27) {
            this.dismissCurrentModal();
        }
    }

    enable() {
        window.on('keydown', this._onKeyDown.bind(this));
    }
}

export default new Modals();
