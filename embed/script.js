'use strict';

var getConfig = function(form) {
  var config = {};
  var inputs = form.querySelectorAll('[name]');
  for (var i = 0; i < inputs.length; ++i) {
    var input = inputs[i];

    var key = input.getAttribute('name');
    var value = input.value;
    if(value.length > 0) {
        config[key] = value;
    }
  }
  return config;
};

var createScript = function() {
  var fragment = document.createElement('div');
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'https://todvora.github.io/gh-events-widget/lib/gh-events-widget.js');
  fragment.appendChild(script);
  return fragment.innerHTML;
}

var createLink = function(config) {
  var fragment = document.createElement('div');
  var link = document.createElement('a');
  link.setAttribute('class', 'gh-events')
  link.appendChild(document.createTextNode('Github events by @' + config['data-user']));
  for (var k in config) {
    link.setAttribute(k, config[k]);
  }
  link.setAttribute('href', 'https://github.com/' + config['data-user']);
  fragment.appendChild(link);
  return fragment.innerHTML;
};

var switchBackground = function(config) {
  var skin = config['data-skin'];
  var prevElement = document.getElementById('preview-content');
  if(skin === 'dark') {
    prevElement.classList.add('dark');
  } else {
    prevElement.classList.remove('dark');
  }
}

document.addEventListener('DOMContentLoaded',function() {
  document.querySelector('form').onsubmit = function(event){
    event.preventDefault();
    var config = getConfig(this);

    switchBackground(config);

    var scr = createScript();
    var link = createLink(config);

    document.getElementById('embed-code').value = link + '\n' + scr;

    document.getElementById('preview-content').innerHTML = link;

    window.initWidgets();
    return false;
  }

  document.querySelector('pre.customcss').onclick = function() {
    var area = document.querySelector('textarea[name="data-style"]');
    area.value += this.innerHTML;
  };
});
