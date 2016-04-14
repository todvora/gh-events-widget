const makeDocument = (frame, data, styles) => {
  var doc = document.implementation.createHTMLDocument('Github Events');
  var div = doc.createElement('div');
  div.innerHTML = data;
  doc.body.appendChild(div);

  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true);
  destDocument.replaceChild(newNode, destDocument.documentElement);

  var link = destDocument.createElement('style');
  link.appendChild(destDocument.createTextNode(styles));
  destDocument.body.appendChild(link);

  frame.style.height = destDocument.body.offsetHeight + 'px';
  destDocument.body.onresize = () => {
    frame.style.height = destDocument.body.offsetHeight + 'px';
  };
  frame.style.border = 0;
  frame.style.overflow = 'hidden';
};

const create = (htmlContent, stylesheet) => {
  var iframe = document.createElement('iframe');
  iframe.onload = () => makeDocument(iframe, htmlContent, stylesheet);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('src', 'about:blank');
  iframe.setAttribute('scrolling', 'no');
  return iframe;
};

module.exports = {
  create: create
};
