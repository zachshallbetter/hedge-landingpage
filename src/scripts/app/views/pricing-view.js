'use strict';

import fetch from 'node-fetch';
import AbstractView from 'app/views/abstract-view';

export default class PricingView extends AbstractView {
    initialize(options) {
        super.initialize(options);

        this.currencySymbols = this.$('.currency-symbols');
        this.monthlyLink = this.$('.pricing__license-link--monthly');
        this.yearlyLink = this.$('.pricing__license-link--yearly');

        this.getCountryCode();
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

    _onMonthlyLink(event) {
        window.ga('send', 'pageview', '/store/monthly');
    }

    _onYearlyLink(event) {
        window.ga('send', 'pageview', '/store/yearly');
    }

    enable() {
        if (!this.enabled) {
            super.enable();

            this.monthlyLink.on('click', this._onMonthlyLink.bind(this));
            this.yearlyLink.on('click', this._onYearlyLink.bind(this));
        }
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();

            this.currencySymbols = null;
            this.monthlyLink = null;
            this.yearlyLink = null;
        }
    }
}
