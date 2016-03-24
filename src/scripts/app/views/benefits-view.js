'use strict';

import AbstractView from 'app/views/abstract-view';

export default class BenefitsView extends AbstractView {
    initialize(options = {}) {
        options.jumpOffset = -175;
        super.initialize(options);

        this.annotations = this.$('.benefit-annotation');
        this.screenshot = this.$('#benefitsAnimationContainer');
        this.posterImage = this.$('#benefitsPosterImage');

        this._loadVideo();
    }

    _loadVideo() {
        this.player = document.createElement('video');
        this.player.loop = true;
        this.player.src = 'videos/hedge-animation-01.mp4';

        this.player.on('timeupdate', (event) => this._invalidateBullets());
        this.player.on('canplay', (event) => {
            this.screenshot.replaceChild(this.player, this.posterImage);
            this.player.play();
        });
    }

    _invalidateBullets() {
        let myTime = this.player.currentTime;
        Array.prototype.forEach.call(this.annotations, (annotation) => {
            let [startsAt, endsAt] = annotation.getAttribute('data-time').split(/\s*->\s*/ig),
                isVisible = myTime >= startsAt && myTime <= endsAt;

            if (isVisible) {
                annotation.classList.add('benefit-annotation--visible');
            } else {
                annotation.classList.remove('benefit-annotation--visible');
            }
        });
    }

    destroy() {
        if (!this.destroyed) {
            super.destroy();

            this.player.stop();

            this.bullets = null;
            this.player = null;
            this.posterImage = null;
            this.screenshot = null;
        }
    }
}
