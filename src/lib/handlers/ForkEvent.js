module.exports = {
  text: (e) => `forked ${e.repo.name} «${e.payload.forkee.description}» to ${e.payload.forkee.full_name}`,
  url: (e) => e.payload.forkee.html_url
};
