'use strict';

import $$ from 'selectjs';

const QueryMixin = {
    /**
     * Helper function to query for elements within this views
     * @param  {String} selector String representing the selector
     */
    $(selector, returnSet = false) {
        if (!this.el) {
            return alwaysReturnAsSet ? [] : null;
        }

        return $$(selector, this.el, returnSet);
    },
};

export default QueryMixin;
