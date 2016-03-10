const jsonp = require('jsonp-es6');
const date = require('./lib/utils/date');
const css = require('./style.css');
const template = require('./template');
const handlers = require('./lib/handlers/registry');
const stringUtils = require('./lib/utils/strings')

const mapEvent = (event) => {

  const handler = handlers[event.type] || handlers.AnyEvent;
  var text = '';
  try {
    var text = handler.text(event)
  } catch(err) {
    text = handlers.AnyEvent.text(event);
  }

  return {
    text: stringUtils.escapeHtml(text),
    url: handler.url(event),
    date: date.pretty(event.created_at),
    type: event.type,
    actor: {
      login: event.actor.login,
      url: `https://github.com/${event.actor.login}`,
      avatar: event.actor.avatar_url
    }
  }
};

const loadData = (config) => {
  jsonp('https://api.github.com/users/'+config.user+'/events/public', {})
    .then(function(data) {
      var transformed = data.data;
      if(config.events) {
        transformed = transformed.filter(event => config.events.indexOf(event.type) > -1);
      }
      transformed = transformed
        .slice(0, Math.min(config.count, transformed.length))
        .map(mapEvent);
      render(config, template(transformed, config));
    })
    .catch(err => console.error(err));
};

function render(config, data) {
  var iframe = document.createElement('iframe');
  iframe.onload = function() {
    makeDocument(iframe, config, data);
  };
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('src', 'about:blank');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('id', config.widgetId);

  var element = document.querySelectorAll('a[data-widget-id="'+config.widgetId+'"]')[0];

  element.parentNode.replaceChild(iframe, element);

}

function makeDocument(frame, config, data) {
  var doc = document.implementation.createHTMLDocument('New Document');
  var div = doc.createElement('div');
  div.innerHTML = data;
  doc.body.appendChild(div);
  var link = doc.createElement('style');
  link.type = 'text/css';
  link.rel = 'stylesheet';

  link.appendChild(doc.createTextNode(`${css} ${config.style}`));
  doc.head.appendChild(link);

  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true);
  destDocument.replaceChild(newNode, destDocument.documentElement);

  // console.log(destDocument.body);
  frame.style.height = destDocument.body.offsetHeight + 'px';

  destDocument.body.onresize = () => {
    frame.style.height = destDocument.body.offsetHeight + 'px';
  };
  frame.style.border = 0;
  frame.style.overflow = 'hidden';
}

var initWidget = function(element, widgetId) {
  var config = {
    user: element.getAttribute('data-user'),
    count: element.getAttribute('data-count') || 5,
    events: element.getAttribute('data-events'),
    skin: element.getAttribute('data-skin'),
    style: element.getAttribute('data-style') || '',
    'display-authors': element.getAttribute('data-display-authors') || false,
    widgetId: 'gh_widget_' + widgetId
  };
  loadData(config);
  element.setAttribute('data-widget-id', config.widgetId);
};

var initWidgets = function() {
  var links = document.getElementsByClassName('gh-events');
  var arr = Array.prototype.slice.call(links);
  arr.forEach(initWidget);
};

window.initWidgets = initWidgets;

document.addEventListener('DOMContentLoaded', initWidgets, false);
