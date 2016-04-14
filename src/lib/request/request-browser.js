import jsonp from 'jsonp-es6';
import { fromMeta } from '../utils/parse-link-header';

const checkErrors = (response) => {
  if (response.meta.status === 404) {
    throw new Error('User not found on Github.');
  }
  if (response.meta.status === 403) {
    throw new Error('Github API rate limit exceeded.');
  }
  if (!Array.isArray(response.data)) {
    throw new Error('no data found');
  }
  if (response.data.length === 0) {
    throw new Error('User has no public events to display.');
  }
};

module.exports = (url, params) => {
  return jsonp(url, params)
    .then(response => {
      checkErrors(response);
      return {
        data: response.data,
        headers: response.meta,
        navigation: fromMeta(response.meta.Link)
      };
    });
};
