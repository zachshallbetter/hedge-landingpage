'use strict';

import raf from 'raf';
import { readonly } from 'core-decorators';
import { remove, sample } from 'lodash';

export class ParticleEmitter {
    constructor(root, Particle, options = {}) {
        this.root = root;
        this.Particle = Particle;

        this.initialize(options);
    }

    initialize(options) {
        this._particles = [];

        this.destroyed = false;
        this.running = false;

        this.emitInterval = options.emitInterval || 100;
        this.maxParticleCount = options.maxParticleCount || 10;
    }

    emit(continuously = true) {
        if (this._particles.length >= this.maxParticleCount) {
            return;
        }

        this._createParticle();

        if (!this.running) {
            this._update();
        }

        if (continuously) {
            this._emitId = setTimeout(() => this.emit(continuously), this.emitInterval);
        }
    }

    burst(numberOfParticles = 10) {
    }

    stop() {
        clearTimeout(this._emitId);
        raf.cancel(this._updateId);

        this._removeAll();
    }

    _update() {
        this._particles.forEach((particle) => {
            particle.update();

            if (particle.died()) {
                this._destroyParticle(particle);
            }
        });

        this.running = true;
        this._updateId = raf(() => this._update());
    }

    _createParticle() {
        let myParticle = new this.Particle();

        this._particles.push(myParticle);
        this.root.insertBefore(myParticle.el, this.root.firstChild);

        return myParticle;
    }

    _removeAll() {

    }

    _destroyParticle(particle) {
        remove(this._particles, particle);
        this.root.removeChild(particle.el);

        particle.destroy();
    }

    destroy() {
        if (!this.destroyed) {
            this.stop();
        }
    }
}

export class AbstractParticle {
    constructor(options = {}) {
        this.initialize(options);
    }

    initialize(options) {
        this.el = document.createElement('div');
        this.el.classList.add('particle');

        this.age = 0;
        this.lifetime = 100;
    }

    update() {
        this.age = this.age + 1;

        if (this.age === this.lifetime) {
            this.el.classList.add('particle--died');
        }
    }

    @readonly
    died() {
        return this.age >= this.lifetime;
    }

    destroy() {
        if (!this.destroyed) {
            this.destroyed = true;
            this.el = null;
        }
    }
}
