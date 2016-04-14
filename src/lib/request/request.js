import rp from 'request-promise';
import { fromHeader } from '../utils/parse-link-header';

module.exports = (url, params) => {
  return rp({
    uri: url,
    qs: params,
    transform: (body, response) => {
      return {
        data: JSON.parse(body),
        headers: response.headers,
        navigation: fromHeader(response.headers.link)
      };
    }
  });
};
