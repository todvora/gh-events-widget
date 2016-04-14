const prettyDate = function (tdate) {
  var d = new Date(Date.parse(tdate));
  var user_date = new Date();
  var diff = Math.floor((user_date - d) / 1000);
  if (diff <= 1) { return 'now'; }
  if (diff < 20) { return diff + 's ago'; }
  if (diff <= 90) { return '1m ago'; }
  if (diff <= 3540) { return Math.round(diff / 60) + 'm ago'; }
  if (diff <= 5400) { return '1h ago'; }
  if (diff <= 86400) { return Math.round(diff / 3600) + 'h ago'; }
  if (diff <= 129600) { return '1d ago'; }
  if (diff < 604800) { return Math.round(diff / 86400) + 'd ago'; }
  if (diff <= 777600) { return '1w ago'; }
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

module.exports = {
  pretty: prettyDate
};
