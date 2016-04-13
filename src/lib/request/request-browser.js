var jsonp = require('jsonp-es6');
const linkParser = require('../utils/parse-link-header');

const checkErrors = (response) => {
  if (response.meta.status === 404) {
    throw new Error('User not found on Github.');
  }
  if(!Array.isArray(response.data)) {
    throw new Error('no data found');
  }
  if(response.data.length === 0) {
    throw new Error('User has no public events to display.');
  }
};

module.exports = (url) => {
  return jsonp(url)
    .then(response => {
      checkErrors(response);
      return {
        data:response.data,
        headers:response.meta,
        navigation: linkParser.fromMeta(response.meta.Link)
      };
    });
};
