module.exports = {
  text: (e) => e.type.replace('Event', '') + '|'  + e.repo.name,
  url: (e) => `https://github.com/${e.repo.name}`
};
