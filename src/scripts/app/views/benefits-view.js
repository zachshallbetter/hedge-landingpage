'use strict';

import AbstractView from 'app/views/abstract-view';

export default class BenefitsView extends AbstractView {
    initialize(options = {}) {
        options.jumpOffset = 175;
        super.initialize(options);
    }
}
