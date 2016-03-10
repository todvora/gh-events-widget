module.exports = {
  text: (e) =>  `commented «${e.payload.issue.title}» in ${e.repo.name}`,
  url: (e) => e.payload.comment.html_url
};
