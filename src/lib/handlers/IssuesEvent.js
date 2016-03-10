module.exports = {
  text: (e) => `${e.payload.action} issue «${e.payload.issue.title}»`,
  url: (e) => e.payload.issue.html_url
};
