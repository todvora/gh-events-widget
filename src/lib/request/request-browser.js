var jsonp = require('jsonp-es6');
const linkParser = require('../utils/parse-link-header');

module.exports = (url) => {
  return jsonp(url)
    .then(response => {
      return {
        data:response.data,
        headers:response.meta,
        navigation: linkParser.fromMeta(response.meta.Link)
      };
    });
};
