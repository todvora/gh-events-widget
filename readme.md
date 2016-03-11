## Github Events Widget
[![Build Status](https://travis-ci.org/todvora/gh-events-widget.svg?branch=master)](https://travis-ci.org/todvora/gh-events-widget)

Embed your Github timeline into your website / blog and show everyone, what are you working on!

## Demo / code generator
On [todvora.github.io/gh-events-widget](https://todvora.github.io/gh-events-widget/)

## How is it working?
Github provides [Events API](https://developer.github.com/v3/activity/events/). This API is called by main script using [JSOP](https://en.wikipedia.org/wiki/JSONP).

## Development
For local development call

```
npm install
npm run dev
```

This starts [Watchify](https://www.npmjs.com/package/watchify) that bundles main script. After that, Express is started to provide rest of the demo / code generator app. Running app should be available on [localhost:4000](http://localhost:4000/).
