module.exports = {
  text: (e) =>  `commented &laquo;${e.payload.issue.title}&raquo; in ${e.repo.name}`,
  url: (e) => e.payload.comment.html_url
};
