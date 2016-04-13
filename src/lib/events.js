const handlers = require('./handlers/registry');
const removeMd = require('remove-markdown');
const request = require('./request/request');

const safeEventText = (handler, event) => {
  try {
    return handler.text(event);
  } catch(err) {
    return handlers.AnyEvent.text(event);
  }
};

const mapEvent = (event) => {
  const handler = handlers[event.type] || handlers.AnyEvent;
  return {
    text: safeEventText(handler, event),
    url: handler.url(event),
    body: handler.body ? removeMd(handler.body(event)) : null,
    date: event.created_at,
    type: event.type,
    actor: {
      login: event.actor.login,
      url: `https://github.com/${event.actor.login}`,
      avatar: event.actor.avatar_url
    }
  };
};

const load = (config) => {
  return request(`https://api.github.com/users/${config.user}/events/public`)
    // .then(res => {console.log(res.navigation); return res;})
    .then((response) => response.data)
    .then((data) => {
      if(config.events) {
        return data.filter(event => config.events.indexOf(event.type) > -1);
      } else {
        return data;
      }
    })
    .then((data) => data.slice(0, Math.min(config.count, data.length)))
    .then((data) => data.map(mapEvent));
};

module.exports = {
  load: load
};
