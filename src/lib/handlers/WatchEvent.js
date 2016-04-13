module.exports = {
  text: (e) => `starred ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
