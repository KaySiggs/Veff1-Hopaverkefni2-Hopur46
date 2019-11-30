/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/named
import { el, empty, load } from './helpers';

export default class Lecture {
  constructor() {
    this.lectures = document.querySelector('.lectures');                // store the container for lecture objects
    this.buttons = document.querySelectorAll('.button');                // store the container for buttons
    this.header = document.querySelector('header');                     // store the header
  }

  load() {
    this.setHeaderImage();                                              // set header image
    this.checkToggling();                                               // check toggling of button filters

    this.buttons.forEach((button) => {                                  // add the toggle() function as a listener to each button
      button.addEventListener('click', this.toggle.bind(this));
    });
  }

  getJSON() {
    return fetch('lectures.json')                                       // fetch json (returns a Promise)
      .then(res => res.json());                               // if successful, get the json data from the response
  }

  lectureBlock(data) {
    const image = el('div');                                            // create a container for the possible image
    image.classList.add('lecture__thumbnail');

    if (data.thumbnail) {                                               // if there is a thumbnail, create an image element and set it up
      const thumbnail = el('img');
      thumbnail.setAttribute('src', data.thumbnail);
      image.appendChild(thumbnail);
    }

    const category = el('h6', data.category);
    category.classList.add('lecture__category');
    category.classList.add('lecture__thin');

    const title = el('h2', data.title);
    title.classList.add('lecture__title');

    const meta = el('div', category, title);
    meta.classList.add('lecture__meta');

    const info = el('div', meta);
    info.classList.add('lecture__info');

    if (data.cleared) {
      const cleared = el('div', '✓');
      cleared.classList.add('lecture__cleared');
      info.appendChild(cleared);
    }

    const card = el('a', image, info);                                  // finally, create a hyperlink that groups everything so that the whole block is clickable
    card.setAttribute('href', `fyrirlestur.html?slug=${data.slug}`);
    card.classList.add('lecture');

    return card;
  }

  checkToggling() {
    this.getJSON()
      .then((data) => {
        const loaded = load();

        return data.lectures.map((i) => {
          i.cleared = loaded.indexOf(i.slug) >= 0;

          return i;
        });
      })
      .then((data) => {
        const activeButtons = Array.from(this.buttons)                  // from the array of buttons
          .filter(i => i.classList.contains('button--active'))          // get the ones that contain the 'button--active' class
          .map(i => i.dataset.extension);                               // and filter them using data-* attributes

        return data.filter(i => activeButtons.length === 0
          || activeButtons.indexOf(i.category) >= 0);
      })
      .then((data) => {
        const entries = data.map((entry) => {
          const col = el('div', this.lectureBlock(entry));
          col.classList.add('lectures__col');
          return col;
        });

        const row = el('div', ...entries);
        row.classList.add('lectures__row');

        empty(this.lectures);

        const toArray =  (...args) => args;

        toArray(row).forEach((entry) => {
          const innerHTML = typeof item !== 'string'
            ? entry : document.createTextNode(entry);

          this.lectures.appendChild(innerHTML);
        });
      });
  }

  toggle(event) {
    event.target.classList.toggle('button--active');

    this.checkToggling();
  }

  setHeaderImage() {
    this.header.style.backgroundImage = "url('img/header.jpg')";
  }
}
