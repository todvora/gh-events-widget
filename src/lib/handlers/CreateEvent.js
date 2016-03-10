const getPayloadRef = (e) => e.payload.ref ? `«${e.payload.ref}»` : '';

module.exports = {
  text: (e) => `created ${e.payload.ref_type} ${getPayloadRef(e)} in ${e.repo.name}`,
  url: (e) => `https://github.com/${e.repo.name}`
};
