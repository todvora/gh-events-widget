const escapeHtml = (str) => {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


module.exports = {
  escapeHtml: escapeHtml
};
