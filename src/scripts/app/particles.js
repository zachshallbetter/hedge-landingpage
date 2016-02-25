'use strict';

import raf from 'raf';
import { readonly } from 'core-decorators';
import { remove, sample } from 'lodash';

export class ParticleEmitter {
    constructor(root, Particle) {
        this.root = root;
        this.Particle = Particle;

        this.destroyed = false;
        this.running = false;

        this._particles = [];
    }

    emit(interval = 250, maxParticleCount = 10, options ={}) {
        if (this._particles.length < maxParticleCount) {
            this._createParticle(options);

            if (!this.running) {
                this._update();
            }
        }

        this._emitId = setTimeout(() => this.emit(interval, maxParticleCount, options), interval);
    }

    burst(numberOfParticles = 10, options = {}) {
        for (let i = 0; i < numberOfParticles; i++) {
            this._createParticle(options);
        }
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

    _createParticle(options) {
        let myParticle = new this.Particle(options);

        this._particles.push(myParticle);
        this.root.insertBefore(myParticle.el, this.root.firstChild);

        return myParticle;
    }

    _removeAll() {
        this._particles.forEach(this._destroyParticle.bind(this));
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
