import Modals from 'app/modals';
import * as ModalTypes from 'app/constants/modal-types';

const ModalMixin = {
    presentDownloadModal: function () {
        Modals.presentModal(ModalTypes.DOWNLOAD);
    },

    presentBuyModal: function () {
        Modals.presentModal(ModalTypes.BUY);
    },
};

export default ModalMixin;
