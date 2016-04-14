module.exports = {
  text: (e) => `${e.type} on ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
