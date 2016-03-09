module.exports = {
  text: (e) => `created ${e.payload.ref_type} in ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
