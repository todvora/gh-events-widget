module.exports = {
  text: (e) => `${e.payload.action} issue «${e.payload.issue.title}» in ${e.repo.name}`,
  url: (e) => e.payload.issue.html_url
};
