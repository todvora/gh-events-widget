module.exports = {
  text: (e) => `deleted ${e.payload.ref_type} «${e.payload.ref}» in ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
