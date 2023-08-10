import { createElement } from '@riadh-adrani/dom-utils';

export * from '../src/index.js';

// create a new style element;
const sheet = createElement('style');
document.head.append(sheet);

const classes: Record<string, string> = {};

const observer = new MutationObserver(mutations => {
  let newClasses: Array<string> = [];

  mutations.forEach(it =>
    it.addedNodes.forEach(it => {
      const element = it as Element;

      if (element.classList) {
        newClasses.push(...element.className.split(' '));
      }
    })
  );

  const currentClasses = Object.keys(classes);

  newClasses = [...new Set(newClasses)].filter(it => {
    const exists = currentClasses.includes(it);

    if (!exists) {
      classes[it] = it;
    }

    return !exists;
  });

  if (newClasses.length > 0) {
    sheet.innerHTML += newClasses.join(' ');
  }
});

observer.observe(document.body, {
  subtree: true,
  attributes: true,
  childList: true,
});
