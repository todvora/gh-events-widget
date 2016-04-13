const rp = require('request-promise');
const linkParser = require('../utils/parse-link-header');

module.exports = (url) => {
  return rp({
    uri:url,
    transform: (body, response) => {
      return {
        data: JSON.parse(body),
        headers: response.headers,
        navigation: linkParser.fromHeader(response.headers.link)
      };
    }
  });
};
