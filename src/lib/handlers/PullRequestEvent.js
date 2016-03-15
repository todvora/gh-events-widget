module.exports = {
  text: (e) =>  `${e.payload.action} pull request «${e.payload.pull_request.title}» in ${e.repo.name}`,
  url: (e) => e.payload.pull_request.html_url
};
