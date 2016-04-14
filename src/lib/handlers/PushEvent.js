function getCommitsText (payload) {
  if (payload.size === 1) {
    return `«${payload.commits[0].message}»`;
  } else {
    return `${payload.size} commits`;
  }
}

module.exports = {
  text: (e) => `pushed ${getCommitsText(e.payload)} to ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
