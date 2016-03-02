'use strict';

export default function createElementFromString(HTMLString) {
    let myContainer = document.createElement('div');
    myContainer.innerHTML = HTMLString;
    
    return myContainer.firstChild;
}
