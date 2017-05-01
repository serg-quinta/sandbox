'use strict';

class Gallery {
  constructor(elem) {
    const gallery = document.querySelector(elem);
    this.main = gallery.querySelector('[data-gallery-main]');

    window.addEventListener('click', this.init.bind(this));
  }

  init(event) {
    let target = event.target.closest('[data-gallery-thumb]');
    if (!target) return;
    event.preventDefault();
    this.main.src = target.href;
    this.main.alt = target.title;
  }
}
