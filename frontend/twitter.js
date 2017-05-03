const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
inquire(() => {

  inquire("button.follow-toggle").each((el, i) => new FollowToggle(el));
  inquire("nav.users-search").each((el) => new UsersSearch(el));
})
