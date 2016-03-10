const getCommentBody = (e) => {
  const body = e.payload.comment.body;
  if (body.length > 50) {
    return body.substr(0, 70) + '...';
  } else {
    return body;
  }
};

module.exports = {
  text: (e) => `added comment «${getCommentBody(e)}» in ${e.repo.name}`,
  url: (e) => e.payload.comment.html_url
};
