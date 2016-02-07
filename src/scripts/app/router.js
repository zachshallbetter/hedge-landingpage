'use strict';

import ENV from 'app/env';

import Url from 'url';
import Logdown from 'logdown';
import $$ from 'selectjs';
import Controller from 'app/controller';

import { uniqueId, trim } from 'lodash';

class Router {
    constructor() {
        this.cid = uniqueId('Router');
        this.logger = new Logdown({ prefix: 'Router' });

        this.initialize();
        this.enable();
    }

    /**
     * Executes when the Router is instantiated
     */
    initialize() {
        this.logger.log(`Initializing \`${this.cid}\``);
        this.viewController = new Controller();

        this.pushStateEnabled = 'pushState' in window.history;

        // Set initial view
        let myPath = window.location.href.replace('http://hedgeformac.dev/', '');
        this.viewController.showView(myPath);
    }

    /**
     * Navigates to a path using pushState
     * @param  {String} path  String representing the path
     */
    navigate(path, title = document.title) {
        if (this.pushStateEnabled) {
            history.replaceState({}, title, path);
        }
    }

    /**
     * Executes when the user clicks on an internal link. If pushState is enabled
     * we use the history object instead of hardlinking.
     * @param  {Event} event Event which triggers the handler
     */
    _onInternalLink(event) {
        if (this.pushStateEnabled && !event.metaKey) {
            event.preventDefault();

            let myUrl = Url.parse(event.srcElement.getAttribute('href')),
                myEvent = new CustomEvent('pushstate', { detail: myUrl.path });

            window.dispatchEvent(myEvent);
            this.navigate(myUrl.path);
        }
    }

    /**
     * Executes when a new state is pushed to the history object
     * @param  {Event} event Event which triggers the handler
     */
    _onPushstate(event) {
        let myPath = trim(event.detail, '/');
        this.viewController.showView(path, true);
    }

    enable() {
        window.on('pushstate', this._onPushstate);
        $$(`a[href*='${ENV.baseUrl}']:not([target])`).on('click', this._onInternalLink.bind(this));
    }
}

export default new Router();
