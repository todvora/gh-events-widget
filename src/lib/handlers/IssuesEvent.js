module.exports = {
  text: (e) => `${e.payload.action} issue &laquo;${e.payload.issue.title}&raquo;`,
  url: (e) => `https://github.com/${e.repo.name}`
};
