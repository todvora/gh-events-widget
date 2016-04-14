// require('babel-polyfill');
require('es6-promise').polyfill();

const template = require('./template');
const request = require('jsonp-es6');
const events = require('./lib/events');
const css = require('./style.css');
const iframe = require('./lib/browser/iframe');

const render = (err, config, data, element) => {
  const htmlContent = template(err, data, config);
  const stylesheet = `${css} ${config.style}`;
  element.parentNode.replaceChild(iframe.create(htmlContent, stylesheet), element);
};

const readConfig = (element) => {
  const eventsText = element.getAttribute('data-events') || '';
  const events = eventsText.split(',').map(event => event.trim());

  return {
    user: element.getAttribute('data-user'),
    count: element.getAttribute('data-count') || 5,
    events: events,
    skin: element.getAttribute('data-skin'),
    style: element.getAttribute('data-style') || '',
    'display-authors': element.getAttribute('data-display-authors') || false
  };
};

const initWidget = (element) => {
  const config = readConfig(element);
  events.load(config)
    .then((data) => render(null, config, data, element))
    .catch((err) => render(err, config, [], element));
};

var initWidgets = () => {
  var links = document.getElementsByClassName('gh-events');
  var arr = Array.prototype.slice.call(links);
  arr.forEach(initWidget);
};

// export init function to be callable later, if needed
window.initWidgets = initWidgets;
window.ghEvents = (config) => events.load(config, request);

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    initWidgets();
  }
};
