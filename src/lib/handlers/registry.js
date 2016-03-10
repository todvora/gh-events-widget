// static imports needed for browserify analysis and embedding
module.exports = {
  PushEvent: require('./PushEvent'),
  CreateEvent: require('./CreateEvent'),
  IssueCommentEvent: require('./IssueCommentEvent'),
  PullRequestEvent: require('./PullRequestEvent') ,
  WatchEvent: require('./WatchEvent'),
  IssuesEvent: require('./IssuesEvent'),
  DeleteEvent: require('./DeleteEvent'),
  ReleaseEvent: require('./ReleaseEvent'),
  MemberEvent: require('./MemberEvent'),
  CommitCommentEvent: require('./CommitCommentEvent'),
  ForkEvent: require('./ForkEvent'),
  PullRequestReviewCommentEvent: require('./PullRequestReviewCommentEvent'),
  AnyEvent: require('./Default')
};
