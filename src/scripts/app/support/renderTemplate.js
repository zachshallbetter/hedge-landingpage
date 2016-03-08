'use strict';

import $$ from 'selectjs';
import { trim } from 'lodash';

export default function renderTemplate(template) {
    let myTemplate = $$(template).innerHTML;
    return renderTemplateFromString(myTemplate);
}

export function renderTemplateFromString(HTMLString) {
    let myContainer = document.createElement('div');
    myContainer.innerHTML = trim(HTMLString);

    return myContainer.firstChild;
}
