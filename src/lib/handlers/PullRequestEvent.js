module.exports = {
  text: (e) =>  `${e.payload.action} pull request in ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
