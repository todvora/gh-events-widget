function getCommitsText(payload) {
  if(payload.size > 1) {
    return `${payload.size} commits`;
  } else {
    return `&laquo;${payload.commits[0].message}&raquo;`;
  }
}

module.exports = {
  text: (e) =>  `pushed ${getCommitsText(e.payload)} to ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
