'use strict';

import AbstractView from 'app/views/abstract-view';

export default class BenefitsView extends AbstractView {
    initialize(options = {}) {
        options.jumpOffset = -175;
        super.initialize(options);

        this.bullets = this.$('.benefit-bullet');
        this.screenshot = this.$('#benefits__animation-container');
        this.posterImage = this.$('#benefits__poster-image');

        this._loadVideo();
    }

    _loadVideo() {
        this.player = document.createElement('video');
        this.player.loop = true;
        this.player.src = 'videos/animation.mov';

        this.player.on('timeupdate', (event) => this._invalidateBullets());
        this.player.on('canplay', (event) => {
            this.screenshot.replaceChild(this.player, this.posterImage);
            this.player.play();
        });
    }

    _invalidateBullets() {
        let myTime = this.player.currentTime;
        Array.prototype.forEach.call(this.bullets, (bullet) => {
            let [startsAt, endsAt] = bullet.getAttribute('data-time').split(/\s*->\s*/ig),
                isVisible = myTime >= startsAt && myTime <= endsAt;

            if (isVisible) {
                bullet.classList.add('benefit-bullet--visible');
            } else {
                bullet.classList.remove('benefit-bullet--visible');
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
