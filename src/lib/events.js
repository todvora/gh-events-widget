import handlers from './handlers/registry';
import removeMd from 'remove-markdown';
import request from './request/request';

const safeEventText = (handler, event) => {
  try {
    return handler.text(event);
  } catch (err) {
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

const getLimitCount = (config) => {
  const limit = parseInt(config.count);
  if (isNaN(limit)) {
    return Number.MAX_VALUE;
  } else {
    return limit;
  }
};

const filterEvents = (config) => {
  return (event) => {
    if (Array.isArray(config.events) && config.events.length > 0) {
      return config.events.indexOf(event.type) > -1;
    } else {
      return true;
    }
  };
};

const consumeAll = (acc, pageNr, config) => {
  return request(`https://api.github.com/users/${config.user}/events/public`, {page: pageNr})
    .then(response => {
      const newData = response.data
        .filter(filterEvents(config))
        .map(mapEvent);
      const all = acc.concat(newData);
      if (all.length < getLimitCount(config) && response.navigation.next && config.paginate) {
        return consumeAll(all, response.navigation.next.page, config);
      } else {
        return Promise.resolve(all.slice(0, getLimitCount(config)));
      }
    });
};

const load = (config) => {
  return consumeAll([], 1, config);
};

module.exports = {
  load: load
};
