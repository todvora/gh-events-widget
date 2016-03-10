module.exports = {
  text: (e) => `${e.payload.action} member @${e.payload.member.login} to ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
