/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
inquire(() => {

  inquire("button.follow-toggle").each((el, i) => new FollowToggle(el));
  inquire("nav.users-search").each((el) => new UsersSearch(el));
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {

  followUser: id => APIUtil.changeFollowStatus(id, "POST"),

  unfollowUser: id => APIUtil.changeFollowStatus(id, "DELETE"),

  changeFollowStatus: (id, method) => (
    $.ajax({
      url: `/users/${id}/follow`,
      dataType: "json",
      method
    })
  ),

  searchUsers: (query, success) => (
    $.ajax({
      url: `/users/search`,
      dataType: "json",
      data: { query }
    })
  )
};

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map