/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable func-names */
import { el } from './helpers';

function entry(type, ...data) {
  const content = el('div', ...data);
  content.classList.add('entry__content');

  const container = el('div', content);
  container.classList.add('entry', `entry--${type}`);

  return container;
}

const Code = function (data) {
  const pre = el('pre', data);                                      // online search led to "pre" which deals with preformatted text such as code snippets
  pre.classList.add('entry__code');

  return entry('code', pre);
};

const Heading = function (data) {
  const h = el('h3', data);
  h.classList.add('entry__heading');

  return entry('heading', h);
};

const Image = function (data, caption) {
  const img = el('img');
  img.classList.add('image__img');
  img.setAttribute('alt', caption);
  img.setAttribute('src', data);

  const cap = el('p', caption);
  cap.classList.add('entry__caption');

  const blockquote = el('div', img, cap);

  return entry('image', blockquote);
};

const List = function (data) {
  const entries = data.map((i) => {
    const li = el('li', i);
    li.classList.add('entry__li');
    return li;
  });

  const ul = el('ul', ...entries);
  ul.classList.add('entry__ul');

  return entry('list', ul);
};

const Quote = function (data, attribute) {
  const quote = el('quote', data);
  quote.classList.add('entry__quote');

  const attr = el('p', attribute);
  attr.classList.add('entry__attribute');

  const blockquote = el('blockquote', quote, attr);

  return entry('blockquote', blockquote);
};

const Text = function (data) {
  const delimited = data.split('\n');

  const texts = delimited.map((t) => {
    const p = el('p', t);
    p.classList.add('entry__text');
    return p;
  });

  return entry('text', ...texts);
};

const Youtube = function (src) {
  const iframe = el('iframe');                                          // prefer iframe over youtube element
  iframe.classList.add('entry__iframe');
  iframe.setAttribute('src', src);

  return entry('youtube', iframe);
};

export default class Factory {                                          // element factory that creates the corresponding element when a type is requested
  static getElement(i) {
    const t = i.type;
    let element;
    switch (t) {
      case 'code':
        element = new Code(i.data, i.attribute);
        break;
      case 'heading':
        element = new Heading(i.data, i.attribute);
        break;
      case 'image':
        element = new Image(i.data, i.caption);
        break;
      case 'list':
        element = new List(i.data, i.attribute);
        break;
      case 'quote':
        element = new Quote(i.data, i.attribute);
        break;
      case 'text':
        element = new Text(i.data);
        break;
      case 'youtube':
        element = new Youtube(i.data);
        break;
      default:
        element = el('div', i.type);
    }
    return element;
  }
}
