const template = require('./template');
const request = require('jsonp-es6');
const events = require('./lib/events');
const css = require('./style.css');
const iframe = require('./lib/browser/iframe');

const render = (config, data, element) => {
  const htmlContent = template(data, config);
  const stylesheet = `${css} ${config.style}`
  element.parentNode.replaceChild(iframe.create(htmlContent, stylesheet), element);
}

const readConfig = (element) => {
  return {
    user: element.getAttribute('data-user'),
    count: element.getAttribute('data-count') || 5,
    events: element.getAttribute('data-events'),
    skin: element.getAttribute('data-skin'),
    style: element.getAttribute('data-style') || '',
    'display-authors': element.getAttribute('data-display-authors') || false
  }
}

const initWidget = (element) => {
  const config = readConfig(element);
  events.load(config, request)
    .then((data) => render(config, data, element))
    .catch((err) => console.error(err));
};

var initWidgets = function() {
  var links = document.getElementsByClassName('gh-events');
  var arr = Array.prototype.slice.call(links);
  arr.forEach(initWidget);
};

// export init function to be callable later, if needed
window.initWidgets = initWidgets;
document.addEventListener('DOMContentLoaded', initWidgets, false);
