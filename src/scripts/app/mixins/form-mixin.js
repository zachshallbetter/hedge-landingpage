'use strict';

import $$ from 'selectjs';

class Form {
    constructor(view, form, options = {}) {
        this.view = view;
        this.form = form;

        this.initialize(options);
    }

    initialize(options) {
        let myInput = $$('input', this.form);

        myInput.on('invalid', (event) => {
            event.preventDefault();
            event.target.classList.add('form__input--attention');
        });

        myInput.on('keydown', (event) => {
            event.target.classList.remove('form__input--attention');
            if (myInput.validity.valid) {
                this.form.classList.add('form--validated');
            } else {

                this.form.classList.remove('form--validated');
            }
        });
    }
}

const FormMixin = {
    initFormMixin: function (form) {
        this.form = new Form(this, form);
    },

    destroyFormMixin: function () {
        this.form = null;
    },
};

export default FormMixin;
