module.exports = {
  text: (e) => `${e.payload.action} release of ${e.repo.name}`,
  url: (e) => e.payload.release.html_url
};
