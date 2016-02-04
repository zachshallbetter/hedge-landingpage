'use strict';

import Logdown from 'logdown';
import Controller from 'app/controller';

import { autobind } from 'core-decorators';
import { uniqueId, trim } from 'lodash';

class Router {
    constructor() {
        this.id = uniqueId('Router');
        this.logger = new Logdown({ prefix: 'Router' });

        this.initialize();
        this.enable();
    }

    /**
     * Executes when the Router is instantiated
     */
    initialize() {
        this.logger.log(`Initializing \`${this.id}\``);
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
     @autobind;
    _onInternalLink(event) {
        if (this.pushStateEnabled && !event.metaKey) {
            event.preventDefault();

            let myLink = $(event.currentTarget).attr('href'),
                myEvent = new CustomEvent('pushstate', { detail: myLink });

            window.dispatchEvent(myEvent);
            this.navigate(myLink);
        }
    }

    /**
     * Executes when a new state is pushed to the history object
     * @param  {Event} event Event which triggers the handler
     */
     @autobind;
    _onPushstate(event) {
        let myPath = trim(event.detail, '/');
        this.viewController.showView(path, true);
    }

    enable() {
        // $(window).on('pushstate', this._onPushstate);
        // $('html').on(`click.${this.id}`, 'a:not([target])', this._onInternalLink);
    }
}

export default new Router();
