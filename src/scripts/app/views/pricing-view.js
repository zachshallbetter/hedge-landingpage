'use strict';

import fetch from 'node-fetch';
import ModalMixin from 'app/mixins/modal-mixin';
import AbstractView from 'app/views/abstract-view';

import { mixin } from 'core-decorators';

@mixin(ModalMixin)
export default class PricingView extends AbstractView {
    initialize(options) {
        super.initialize(options);

        this.currencySymbols = this.$('.currency-symbols');
        this.downloadLink = this.$('.pricing__download-link');
        this.getCountryCode();
    }

    _onDownloadLink(event) {
        event.preventDefault();
        this.presentDownloadModal();
    }

    getCountryCode(ip) {
        fetch('https://geoip.nekudo.com/api')
          .then((response) => response.json())
          .then((json) => this.setCountryCode(json.country.code));
    }

    setCountryCode(code) {
        let myEuroCountries = ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'];
        if (~myEuroCountries.indexOf(code)) {
            [].forEach.call(this.currencySymbols, (element) => {
                element.innerHTML = '&euro;';
            });

            document.body.classList.add('euro-country');
        }
    }

    enable() {
        if (!this.enabled) {
            super.enable();

            // this.downloadLink.on('click', this._onDownloadLink.bind(this));
        }
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();

            this.downloadLink = null;
            this.currencySymbols = null;
        }
    }
}
