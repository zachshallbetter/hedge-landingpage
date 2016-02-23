'use strict';

import { ParticleEmitter, AbstractParticle } from 'app/particles';
import { sample } from 'lodash';

class GlitterParticle extends AbstractParticle {
    initialize(options) {
        super.initialize(options);

        this.lifetime = 250;
        this.depth = parseInt(Math.random() * 3);
        this.speed = (this.depth + 1) * 1.5 + Math.random() * 2;
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
            emitInterval: Math.random() * 500 + 500,
        };

        this.emitter = new ParticleEmitter(this.el, GlitterParticle, myOptions);
        this.emitter.emit();
    },

    destroyBackgroundAnimation: function () {
        this.emitter.destroy();
    },
};

export default BackgroundAnimMixin;
