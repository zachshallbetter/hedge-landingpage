'use strict';

import $$ from 'selectjs';
import assert from 'assert';
import raf from 'raf';

import { readonly } from 'core-decorators';
import { remove, sample } from 'lodash';

class ParticleEmitter {
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

class AbstractParticle {
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

class GlitterParticle extends AbstractParticle {
    initialize(options) {
        super.initialize(options);

        this.lifetime = 250;
        this.depth = parseInt(Math.random() * 3);
        this.speed = (this.depth + 1) + Math.random();
        this.translation = 0;

        let myColor = sample(['blue', 'green', 'white']),
            mySize = ['small', 'normal', 'big'][this.depth];

        let myTop = (Math.random() * 0.7 + 0.15) * 100,
            myLeft = Math.random() * 75;

        this.el.className = `glitter-particle glitter-particle--color-${myColor} glitter-particle--size-${mySize}`;
        this.el.style.cssText = `left: ${myLeft}%; top: ${myTop}%`;
    }

    update() {
        super.update();

        this.translation += this.speed;

        this.el.style.WebkitTransform = `translate3d(${this.translation}px, 0, 0)`;
        this.el.style.msTransform = `translate3d(${this.translation}px, 0, 0)`;
        this.el.style.transform = `translate3d(${this.translation}px, 0, 0)`;
    }
}

const BackgroundAnimMixin = {
    initBackgroundAnimation: function () {
        let myOptions = {
            emitInterval: Math.random() * 500 + 2000,
        };

        this.emitter = new ParticleEmitter(this.el, GlitterParticle, myOptions);
        this.emitter.emit();
    },

    destroyBackgroundAnimation: function () {
        this.emitter.destroy();
    },
};

export default BackgroundAnimMixin;
