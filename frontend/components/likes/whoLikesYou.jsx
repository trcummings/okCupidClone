var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var WhoLikesYou = React.createClass({
  componentDidMount: function () {
  },

  renderUserList: function () {
    var currentUser = SessionStore.currentUser();

    return (
      <ul>
      {
        currentUser.likers.map(function (user, index) {
          return (
            <li className='likelist-user' key={index}>
              <img src={user.photo_url} />
              <span>{user.username}</span>
            </li>
          );
        })
      }
      </ul>
    );
  },

  render: function() {
    var currentUser = SessionStore.currentUser();

    return (
      <div className='user-list-box'>
        <ul className='user-list-section-left'>
          {this.renderUserList()}
        </ul>

        <section className='user-list-like-count'>
          <i className='fa fa-star fa-2' aria-hidden='true'></i>
          <h2>{currentUser.likers.length + ' people like you'}</h2>
          <i className="fa fa-arrow-right fa-2" aria-hidden="true"></i>
        </section>

        <section className='user-list-about'>
          <h1>About Who Likes You</h1>
          <p>These are people who like you on PerfectPair’s site. Maybe they could like you in real life too! You don't get that kind of vulnerability every day. Imagine how messed up it would be if people just wore their insecurities on their chests. I know I wouldn't leave the house if every shirt I owned said "sensitive about the size of his hands"</p>
        </section>
      </div>
    );
  }
});

module.exports = WhoLikesYou;
