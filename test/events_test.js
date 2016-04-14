import assert from 'assert';
import path from 'path';
import nock from 'nock';
import { load } from '../src/lib/events.js';

describe('Events reader', () => {
  before(() => {
    nock.disableNetConnect();
    nock('https://api.github.com')
      .defaultReplyHeaders({
        'Content-Type': 'application/json',
        'Link': '<https://api.github.com/user/2047615/events/public?page=2>; rel="next", <https://api.github.com/user/2047615/events/public?page=6>; rel="last"'
      })
      .get('/users/todvora/events/public?page=1')
      .times(1000) // for every request on this url
      .replyWithFile(200, path.join(__dirname, 'assets', 'public.todvora.json'));
  });

  it('should read and parse public events stream', async() => {
    const events = await load({user: 'todvora', count: 30});
    assert.equal(events.length, 30);

    const first = events[0];

    const expected = {
      text: 'starred karpathy/convnetjs',
      url: 'https://github.com/karpathy/convnetjs',
      body: null,
      date: '2016-04-13T05:46:35Z',
      type: 'WatchEvent',
      actor: {
        login: 'todvora',
        url: 'https://github.com/todvora',
        avatar: 'https://avatars.githubusercontent.com/u/4102775?'
      }
    };
    assert.deepEqual(first, expected);
  });

  it('should return only first N events', async() => {
    const events = await load({user: 'todvora', count: 5});
    assert.equal(events.length, 5);
    assert.equal(events[0].text, 'starred karpathy/convnetjs');
  });

  it('should filter only selected event types', async() => {
    const events = await load({user: 'todvora', count: 30, events: ['PushEvent', 'PullRequestEvent']});
    assert.equal(events.length, 15);
    events.forEach(event => {
      const isValidType = event.type === 'PushEvent' || event.type === 'PullRequestEvent';
      assert.ok(isValidType, `Event type ${event.type} not expected!`);
    });
  });
});
