'use strict';

import AbstractView from 'app/views/abstract-view';
import { throttle } from 'core-decorators';

export default class NavigationView extends AbstractView {

    _invalidateBackground() {
        let myPosition = window.pageYOffset;
        if (myPosition >= 250) {
            this.el.classList.add('navigation--activated');
        } else {
            this.el.classList.remove('navigation--activated');
        }
    }

    /**
     * Executes while the user scrolls the pages
     * @param  {event} event Event which triggers the handler
     */
     @throttle(300)
    _onScroll(event) {
        this._invalidateBackground();
    }

    enable() {
        if (!this.enabled) {
            super.enable();

            window.on('scroll', this._onScroll.bind(this));
        }
    }
}
