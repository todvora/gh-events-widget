// could be replaced by https://github.com/thlorenz/parse-link-header, but it's too big and heavy!

const getUrlParams = (url) => {
  const urlParts = url.split('?');
  const query = urlParts.length > 1 ? urlParts[1] : '';

  return query.split('&').map(pair => {
    const keyVal = pair.split('=');
    return {
      key: keyVal[0],
      value: keyVal[1]
    };
  });
};

const fromHeader = (header) => {
  if(!header) {
    return {};
  }
  const links = header.split(',');
  return links
    .map(link => {
      const items = link.split(';').map(i => i.trim());
      const result = {};

      result.url = items[0].slice(1,-1);

      getUrlParams(result.url).forEach(item => {
        result[item.key] = item.value;
      });

      items.slice(1)
        .map(keyValue => keyValue.split('='))
        .map(pair => {return {key:pair[0], value:pair[1].slice(1,-1)};})
        .forEach(pair => {
          result[pair.key] = pair.value;
        });
      return result;
    })
    .reduce((acc, curr) => {
      acc[curr.rel] = curr;
      return acc;
    }, {});
};

const fromMeta = (meta) => {
  if(!meta) {
    return {};
  }
  return meta
    .map(row => {
      const result = {};
      result.url = row[0];
      const args = row[1];
      Object.keys(args).forEach(key => {result[key] = args[key];});

      getUrlParams(result.url).forEach(item => {
        result[item.key] = item.value;
      });

      return result;
    })
    .reduce((acc, curr) => {
      acc[curr.rel] = curr;
      return acc;
    }, {});
};

module.exports = {
  fromHeader: fromHeader,
  fromMeta: fromMeta
};
