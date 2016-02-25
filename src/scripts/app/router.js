'use strict';

import $$ from 'selectjs';
import Url from 'url';
import QueryString from 'query-string';
import Logdown from 'logdown';

import Config from 'app/config';
import Controller from 'app/controller';

import { first, uniqueId, trim } from 'lodash';

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
        this.controller = new Controller();

        this.pushStateEnabled = 'pushState' in window.history;

        // Set initial view
        let myUrl = Url.parse(first(window.location.href.split(/[?#]/)));
        this.controller.scrollToElementAtPath(myUrl.path);

        let myQueryString = QueryString.parse(window.location.search);
        if (!!myQueryString.ref) {
            this.controller.showNotification(myQueryString.ref);
        }
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

            let myUrl = Url.parse(event.currentTarget.getAttribute('href')),
                myEvent = new CustomEvent('pushstate', { detail: myUrl.path });

            window.dispatchEvent(myEvent);
            this.navigate(`${myUrl.path}${window.location.search}`);
        }
    }

    /**
     * Executes when a new state is pushed to the history object
     * @param  {Event} event Event which triggers the handler
     */
    _onPushstate(event) {
        let myPath = trim(event.detail, '/');
        this.controller.scrollToElementAtPath(myPath, true);
    }

    enable() {
        window.on('pushstate', this._onPushstate.bind(this));
        $$(`a:not([target])`).on('click', this._onInternalLink.bind(this));
    }
}

export default new Router();
