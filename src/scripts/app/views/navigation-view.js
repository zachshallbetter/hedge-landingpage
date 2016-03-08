'use strict';

import AbstractView from 'app/views/abstract-view';
import { throttle } from 'core-decorators';

export default class NavigationView extends AbstractView {
    _invalidate() {
        let myPosition = window.pageYOffset,
            myClassName;

        myClassName = 'navigation--fixed';
        if (myPosition >= 70) {
            this.el.classList.add(myClassName);
        } else {
            this.el.classList.remove(myClassName);
        }

        myClassName = 'navigation--activated';
        if (myPosition >= 250) {
            this.el.classList.add(myClassName);
        } else {
            this.el.classList.remove(myClassName);
        }
    }

    /**
     * Executes while the user scrolls the pages
     * @param  {event} event Event which triggers the handler
     */
     @throttle(50)
    _onScroll(event) {
        this._invalidate();
    }

    enable() {
        if (!this.enabled) {
            super.enable();
            window.on('scroll', this._onScroll.bind(this));
        }
    }
}
