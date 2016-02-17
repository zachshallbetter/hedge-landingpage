'use strict';

import AbstractView from 'app/views/abstract-view';
import BackgroundAnimMixin from 'app/mixins/background-animation-mixin';

import { mixin } from 'core-decorators';

@mixin(BackgroundAnimMixin)
export default class ReminderView extends AbstractView {
    initialize(options = {}) {
        super.initialize(options);
        this.initBackgroundAnimation();
    }
}
