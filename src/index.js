const jsonp = require('jsonp-es6');
const date = require('./lib/utils/date');
const css = require('./style.css');
const template = require('./template');

const handlers = {
  PushEvent: require('./lib/handlers/PushEvent'),
  CreateEvent: require('./lib/handlers/CreateEvent'),
  IssueCommentEvent: require('./lib/handlers/IssueCommentEvent'),
  PullRequestEvent: require('./lib/handlers/PullRequestEvent') ,
  WatchEvent: require('./lib/handlers/WatchEvent'),
  IssuesEvent: require('./lib/handlers/IssuesEvent'),
  AnyEvent: require('./lib/handlers/Default')
};

const mapEvent = (event) => {
  const handler = handlers[event.type] || handlers.AnyEvent;
  return {
    text: handler.text(event),
    url: handler.url(event),
    date: date.pretty(event.created_at)
  };
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
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('src', 'about:blank');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('id', config.widgetId);

  var element = document.querySelectorAll('a[data-widget-id="'+config.widgetId+'"]')[0];

  element.parentNode.replaceChild(iframe, element);
  iframe.onload = function() {
    makeDocument(iframe, config, data);
  };
}

function makeDocument(frame, config, data) {
  var doc = document.implementation.createHTMLDocument('New Document');

  doc.body.style.margin = 0;
  doc.body.style.padding = 0;
  var p = doc.createElement('p');
  p.style.margin = 0;
  p.style.padding = 0;
    //p.style['word-break'] = 'break-all';
  p.innerHTML = data;
  try {
    doc.body.appendChild(p);
  } catch(e) {
    console.log(e);
  }


  var link = doc.createElement('style');
  link.type = 'text/css';
  link.rel = 'stylesheet';

  link.appendChild(doc.createTextNode(`${css} ${config.style}`));
  doc.head.appendChild(link);


  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true);
  destDocument.replaceChild(newNode, destDocument.documentElement);

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
    style: element.getAttribute('data-style') || '',
    widgetId: 'gh_widget_' + widgetId
  };
  loadData(config);
  element.setAttribute('data-widget-id', config.widgetId);
};

var initWidgets = function() {
  var links = document.getElementsByClassName('gh-events');
  console.log(links);
  var arr = Array.prototype.slice.call(links);
  arr.forEach(initWidget);
};

window.initWidgets = initWidgets;

document.addEventListener('DOMContentLoaded', initWidgets, false);
