module.exports = {
  text: (e) => `reviewed pull request «${e.payload.pull_request.title}» in ${e.repo.name}`,
  url: (e) => e.payload.comment.html_url
};
