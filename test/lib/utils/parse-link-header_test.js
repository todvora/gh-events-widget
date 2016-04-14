import assert from 'assert';
import { fromMeta, fromHeader } from '../../../src/lib/utils/parse-link-header';

describe('Link header parser', () => {
  it('should parse next and last links from header', () => {
    const header = '<https://api.github.com/user/4102775/events/public?page=2>; rel="next", <https://api.github.com/user/4102775/events/public?page=7>; rel="last"';

    const expected = {
      next: {
        page: '2',
        rel: 'next',
        url: 'https://api.github.com/user/4102775/events/public?page=2'
      },
      last: {
        page: '7',
        rel: 'last',
        url: 'https://api.github.com/user/4102775/events/public?page=7'
      }
    };
    const parsed = fromHeader(header);
    assert.deepEqual(parsed, expected);
  });

  it('should parse links with multiple params from header', () => {
    const linkHeader = `<https://api.github.com/user/9287/repos?page=3&per_page=100>; rel="next",
      <https://api.github.com/user/9287/repos?page=1&per_page=100>; rel="prev"; pet="cat",
      <https://api.github.com/user/9287/repos?page=5&per_page=100>; rel="last"`;

    const expected = {
      next: {
        page: '3',
        per_page: '100',
        rel: 'next',
        url: 'https://api.github.com/user/9287/repos?page=3&per_page=100'
      },
      prev: {
        page: '1',
        per_page: '100',
        rel: 'prev',
        pet: 'cat',
        url: 'https://api.github.com/user/9287/repos?page=1&per_page=100'
      },
      last: {
        page: '5',
        per_page: '100',
        rel: 'last',
        url: 'https://api.github.com/user/9287/repos?page=5&per_page=100'
      }
    };

    assert.deepEqual(fromHeader(linkHeader), expected);
  });

  it('should parse links from meta (jsonp)', () => {
    const meta = [
      ['https://api.github.com/user/4102775/events/public?callback=callback_json1&page=2', { rel: 'next' }],
      ['https://api.github.com/user/4102775/events/public?callback=callback_json1&page=7', { rel: 'last' }]
    ];

    const expected = {
      next: {
        page: '2',
        rel: 'next',
        callback: 'callback_json1',
        url: 'https://api.github.com/user/4102775/events/public?callback=callback_json1&page=2'
      },
      last: {
        page: '7',
        rel: 'last',
        callback: 'callback_json1',
        url: 'https://api.github.com/user/4102775/events/public?callback=callback_json1&page=7'
      }
    };

    assert.deepEqual(fromMeta(meta), expected);
  });
});
