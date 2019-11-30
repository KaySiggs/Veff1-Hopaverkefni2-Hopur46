/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
// eslint-disable-next-line import/named
import {
  el, empty, load, save,
} from './helpers';
import Factory from './element-factory';

export default class LecturePage {
  constructor() {
    this.container = document.querySelector('.lecture-section');
    this.header = document.querySelector('header');
  }

  load() {
    const loc = new URLSearchParams(window.location.search);
    const slug = loc.get('slug');

    this.getLecture(slug)
      .then(data => this.display(data));
  }

  getLecture(slug) {
    return fetch('lectures.json')
      .then(res => res.json())
      .then((data) => {
        const lecture = data.lectures.find(i => i.slug === slug);

        return lecture;
      });
  }

  setHeader(data) {
    const category = el('h6', data.category);
    category.classList.add('header__text-uppercase');
    const title = el('h1', data.title);
    const headerText = el('div', category, title);
    headerText.classList.add('header__text');
    const headerContent = el('div', headerText);
    headerContent.classList.add('header__content');
    this.header.appendChild(headerContent);

    if (data.image) {
      this.header.style.backgroundImage = `url(${data.image})`;
    }
  }

  generateLecture(content) {
    const col = el('div');
    col.classList.add('lecture-section__col');
    const row = el('div', col);
    row.classList.add('lecture-section__row');
    const cnt = el('div', row);
    cnt.classList.add('lecture-section__content');

    content.forEach((i) => {
      const elem = Factory.getElement(i);
      col.appendChild(elem);
    });

    return cnt;
  }

  setCleared(slug, event) {
    const cleared = event.target.classList.contains('lecture-section__clear--cleared');

    if (cleared) {
      // eslint-disable-next-line no-param-reassign
      event.target.textContent = 'Klára fyrirlestur';
    } else {
      // eslint-disable-next-line no-param-reassign
      event.target.textContent = '✓ Fyrirlestur kláraður';
    }

    event.target.classList.toggle('lecture-section__clear--cleared');

    save(slug, !cleared);
  }

  generateFooter(slug, cleared) {
    const isCleared = cleared ? '✓ Fyrirlestur kláraður' : 'Klára fyrirlestur';
    const clear = el('button', isCleared);
    clear.classList.add('lecture-section__clear');

    if (cleared) {
      clear.classList.add('lecture-section__clear--cleared');
    }

    clear.addEventListener('click', this.setCleared.bind(this, slug));

    const ret = el('a', 'Til baka');
    ret.classList.add('lecture-section__return');
    ret.setAttribute('href', 'https://notendur.hi.is/~mao54/vefforritun/hopaverkefni2/');

    const footer = el('footer', clear, ret);
    footer.classList.add('footer');

    return footer;
  }

  display(data) {
    this.setHeader(data);
    const content = this.generateLecture(data.content);
    const cleared = this.isCleared(data.slug);
    const footer = this.generateFooter(data.slug, cleared);

    empty(this.container);

    const toArray =  (...args) => args;

    toArray(content).forEach((item) => {
      const innerHTML = typeof item === 'string'
        ? document.createTextNode(item) : item;

      this.container.appendChild(innerHTML);
    });

    toArray(footer).forEach((item) => {
      const innerHTML = typeof item === 'string'
        ? document.createTextNode(item) : item;

      this.container.appendChild(innerHTML);
    });
  }

  isCleared(slug) {
    const lecture = load();

    return lecture.indexOf(slug) >= 0;                                  // check if the entry exists (!== -1)
  }
}
