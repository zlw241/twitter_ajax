const APIUtil = require('./api_util');

class FollowToggle {
  constructor(el, options) {
    this.el = inquire(el);
    this.userId = this.el.attr('data-user-id') || options.userId;
    this.followState = this.el.attr('data-initial-follow-state') || options.followState;

    this.el.on('click', this.handleClick.bind(this));
    this.render()
  }

  render() {
    if (this.followState === "following" || this.followState === "unfollowing") {
      this.el.attr('disabled', 'false')
    } else {
      this.el.removeAttr('disabled');
      if (this.followState === "unfollowed") {
        this.el.html("Follow!")
      } else {
        this.el.html("Unfollow!")
      }
    }
  }

  toggleFollowState() {
    if (this.followState === "unfollowed") {
      this.followState = "followed";
    } else {
      this.followState = "unfollowed";
    }
  }

  handleClick(e) {
    e.preventDefault();
    debugger
    const followToggle = this;

    if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();

      APIUtil.unfollowUser(this.userId) .then(() => {
        followToggle.followState = "unfollowed"
        followToggle.render();
      });

    } else if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then(() => {
        followToggle.followState = "followed"
        followToggle.render();
      });
    }
  }
}


module.exports = FollowToggle;
