var escape = function(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text || ''));
  return div.innerHTML
};

var glyphicons = {
  ForkEvent :'glyphicon-cutlery',
  PushEvent: 'glyphicon-cloud-upload',
  CreateEvent: 'glyphicon-plus',
  IssueCommentEvent: 'glyphicon-comment',
  PullRequestEvent: 'glyphicon-folder-open',
  WatchEvent: 'glyphicon-star',
  IssuesEvent: 'glyphicon-comment',
  DeleteEvent: 'glyphicon-trash',
  ReleaseEvent: 'glyphicon-gift',
  MemberEvent: 'glyphicon-user',
  CommitCommentEvent:'glyphicon-comment',
  PullRequestReviewCommentEvent: 'glyphicon-comment'
};

var getGlyphicon = function(eventType) {
  return glyphicons[eventType] || 'glyphicon-check'
}

var getBody = function(event) {
  if(event.body) {
  return `<blockquote style="font-size:80%">${escape(event.body)}</blockquote>`;
  } else {
    return '';
  }
}

var buildItem = function(event, index) {
  //
  var div = document.createElement('li');
  if(index % 2 == 1) {
    div.classList.add('timeline-inverted')
  }
  div.innerHTML = `
    <div class="timeline-badge"><i class="glyphicon ${getGlyphicon(event.type)}"></i></div>
    <div class="timeline-panel">
    <div class="media">
      <div class="media-left">
        <a href="${event.actor.url}">
          <img class="media-object" src="${event.actor.avatar}s=48" width="48" height="48" alt="${event.actor.login}">
        </a>
      </div>
      <div class="media-body">
        <p><a href="${event.actor.url}">${event.actor.login}</a></p>
        <p><small class="text-muted""><i class="glyphicon glyphicon-time"></i> ${new Date(event.date).toString()}</small></p>
        <p>${escape(event.text)}</p>
        ${getBody(event)}
        <span class="link"><a href="${event.url}" target="_blank">details »</a></span>
        <p></p>
      </div>
    </div>
    </div>
  `;
  return div;
}

document.addEventListener('DOMContentLoaded',function() {

  var config = {
    count:30,
    paginate: true
  }

  var pairs = window.location.search.slice(1).split('&');
  pairs.forEach(function(pair){
    var kv = pair.split('=');
    config[kv[0]] = kv[1];
  })

  var heading = document.querySelector('a.gh-username');
  heading.appendChild(document.createTextNode('@' + config.user));
  heading.setAttribute('href', heading.getAttribute('href') + escape(config.user));

  window.ghEvents(config)
    .then(function(events){
      var timeline = document.querySelector('ul.timeline');
      events.map(buildItem).forEach(
        function(fragment){
          timeline.appendChild(fragment);
        });
    })
    .catch(function(err) {
      var timeline = document.querySelector('ul.timeline');
      var alert = document.createElement('div');
      alert.appendChild(document.createTextNode(err.message));
      alert.className += 'alert alert-danger';
      timeline.parentNode.appendChild(alert);
      timeline.parentNode.removeChild(timeline);
    });
});
