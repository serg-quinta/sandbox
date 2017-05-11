'use strict';
class Slider {
  constructor(options) {
    this.slider = document.querySelector(options.selector);
    this.thumb = this.slider.querySelector('[data-slider-thumb]');

    this.slider.addEventListener('mousedown', this._slide.bind(this));
    this.pixelsPerValue = (this.slider.clientWidth - this.thumb.offsetWidth) / options.max;
  }

  _slide(event) {
    const target = event.target.closest('[data-slider-thumb]');
    if (!target) return;

    this.moveHandler = this._move.bind(this);
    document.addEventListener('mousemove', this.moveHandler);
    this.stopHandler = this._stop.bind(this);
    document.addEventListener('mouseup', this.stopHandler);

  }

  _move(event) {
    let leftPosition = event.pageX - this.slider.getBoundingClientRect().left - this.thumb.offsetWidth / 2;
    let leftMax = this.slider.offsetWidth - this.thumb.offsetWidth;
    if (leftPosition < 0) {
      this.thumb.style.left = 0 + 'px';
    } else if (leftPosition > leftMax) {
      this.thumb.style.left = leftMax + 'px';
    } else {
      this.thumb.style.left = leftPosition + 'px';
    }
    this._slideEvent();
  }

  _stop() {
    document.removeEventListener('mousemove', this.moveHandler);
    document.removeEventListener('mouseup', this.stopHandler);
    this._changeEvent();
  }

  _slideEvent() {
    let slideEvent = new CustomEvent("slide", {
      detail: document.querySelector('[data-slider-slide]').innerHTML = this._positionToValue(parseInt(this.thumb.style.left))
    });
    this.slider.dispatchEvent(slideEvent);
  }

  _changeEvent() {
    let changeEvent = new CustomEvent("slide", {
      detail: document.querySelector('[data-slider-change]').innerHTML = this._positionToValue(parseInt(this.thumb.style.left))
    });
    this.slider.dispatchEvent(changeEvent);
  }

  _positionToValue(left) {
    return Math.round(left / this.pixelsPerValue);
  }

  _valueToPosition(value) {
    return this.pixelsPerValue * value;
  }

  setValue(value) {
    this.thumb.style.left = this._valueToPosition(value) + 'px';
  }
}
