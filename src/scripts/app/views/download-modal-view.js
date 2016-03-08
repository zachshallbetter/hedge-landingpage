'use strict';

import AbstractModalView from 'app/views/abstract-modal-view';

export default class DownloadModalView extends AbstractModalView {
    constructor(options = {}) {
        options.template = '#download-modal-template';
        super(options);
    }
}
