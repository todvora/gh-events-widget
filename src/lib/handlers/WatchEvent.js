module.exports = {
  text: (e) => `${e.payload.action} watching ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
