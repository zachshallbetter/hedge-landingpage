'use strict';

import AbstractView from 'app/views/abstract-view';

export default class PricingView extends AbstractView {
    initialize(options) {
        super.initialize(options);

        this.currencySymbols = this.$('.currency-symbols');
        this.getCountryCode();
    }

    getCountryCode(ip) {
        fetch('http://ip-api.com/json')
          .then((response) => response.json())
          .then((json) => this.setCountryCode(json.countryCode));
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

    destroy() {
        if (!this.destroyed) {
            super.destroy();
            this.currencySymbols = null;
        }
    }
}
