'use strict';
class Slider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    this.thumb = this.slider.querySelector('[data-slider-thumb]');

    this.slider.addEventListener('mousedown', this._slide.bind(this));
  }

  _slide(event) {
    const target = event.target.closest('[data-slider-thumb]');
    if (!target) return;

    document.addEventListener('mousemove', this._move.bind(this));
    this.slider.addEventListener('mouseup', this._stop.bind(this));
  }

  _move(event) {
    let leftPosition = event.pageX - this.thumb.offsetWidth - this.slider.getBoundingClientRect().left / 2;
    let leftMin = this.slider.getBoundingClientRect().left - this.thumb.offsetWidth / 2;
    let leftMax = this.slider.getBoundingClientRect().right + this.thumb.offsetWidth / 2;
    if (leftPosition > leftMax) {
      this.thumb.style.left = this.slider.offsetWidth - this.thumb.offsetWidth / 2 + 'px';
    } else if (leftPosition < leftMin) {
      this.thumb.style.left = -this.thumb.offsetWidth / 2 + 'px';
    } else {
      this.thumb.style.left = leftPosition + 'px';
    }
    console.log(leftPosition);
  }

  _stop() {
    document.removeEventListener('mousemove', this._move);
    // this.slider.removeEventListener('mouseup', this._stop.bind(this));
    console.log('Works!');
  }
}
