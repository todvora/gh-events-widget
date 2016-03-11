const handlers = require('./handlers/registry');

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
    date: event.created_at,
    type: event.type,
    actor: {
      login: event.actor.login,
      url: `https://github.com/${event.actor.login}`,
      avatar: event.actor.avatar_url
    }
  };
};

const load = (config, requestFunction) => {
  return requestFunction(`https://api.github.com/users/${config.user}/events/public`)
    .then((data) => data.data ? data.data : data)
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
