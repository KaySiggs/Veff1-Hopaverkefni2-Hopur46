/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, ...children) {                                 // el() from lectures
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    for (let child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    }
  }

  return element;
}

const LECTURES_KEY = 'ticked_lectures';

export function load() {                                                // load inspired by v10-synilausn
  const json = localStorage.getItem(LECTURES_KEY);
  const parsedJSON = JSON.parse(json) || [];

  return parsedJSON;
}

export function save(url) {
  const json = localStorage.getItem(LECTURES_KEY);
  const parsedJSON = JSON.parse(json) || [];

  const idx = parsedJSON.indexOf(url);

  if (idx >= 0) {                                                       // if not -1, it means there is an entry at index idx
    parsedJSON.splice(idx, 1);                                          // remove the entry
  } else {
    parsedJSON.push(url);                                               // otherwise, insert a new entry
  }

  localStorage.setItem(LECTURES_KEY, JSON.stringify(parsedJSON));
}
