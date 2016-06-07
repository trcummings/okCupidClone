var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var WhoYouLike = React.createClass({
  componentDidMount: function () {
  },

  renderUserList: function () {
    var currentUser = SessionStore.currentUser();

    return (
      <ul>
      {
        currentUser.likees.map(function (user, index) {
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
          <h1>About Who You Like</h1>
          <p>These are people you’ve liked on PerfectPair’s site. Be bold, send them a message, or don't and wallow. Not my problem!</p>
        </section>
      </div>
    );
  }

});

module.exports = WhoYouLike;
