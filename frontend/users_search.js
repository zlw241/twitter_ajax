const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor(el) {
    this.el = inquire(el);
    this.input = this.el.find('input');
    this.ul = this.el.find('.users');

    this.input.on("input", this.handleInput.bind(this))
  }

  handleInput(e) {
    const queryVal = e.currentTarget.value;
    APIUtil.searchUsers(queryVal).then(this.renderResults.bind(this))
  }

  // createButton(user) {
  //   const button = document.createElement('button')
  //   inquire(button).addClass("follow-toggle");
  //   return button
  // }

  renderResults(res) {
    this.ul.empty();
    res.forEach((el) => {
      const li = inquire(document.createElement('li'))
      const a = inquire(document.createElement('a'))
      a.attr('href', `/users/${el.id}`)
      a.html(el.username);
      li.append(a);

      // const button = this.createButton()
      // new FollowToggle(button, {userId: el.id,
      //    followState: el.followed ? "followed" : "unfollowed"})
      // li.append(button);

      this.ul.append(li);

    })
  }
}

module.exports = UsersSearch;
