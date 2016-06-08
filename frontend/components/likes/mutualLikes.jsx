var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var MutualLikes = React.createClass({
  renderUserList: function () {
    var currentUser = SessionStore.currentUser();

    return (
      <ul>
      {
        currentUser.mutualLikes.map(function (user, index) {
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
          <h1>About Mutual Likes</h1>
          <p>These people like you back but you're sitting here reading this, and NOT messaging them? Imagine the sheer vulnerability it takes to tell someone you like them. You've already both opened yourselves up to the cold, horrible world, and you're letting eachother shiver there like an exposed nerve! When I was in second grade, I told a girl I liked her, so she spilled my lemonade on my math homework and told everyone I 'peed my homework'. My family had to move because I would cry every time I got within two and a half miles of the school. My dad had a cancer scare and everything. He's fine though. He took me aside after the 'oscopy and said 'son, I'm really high on painkillers, and it's very important that you look at these pictures of the inside of my colon'</p>
        </section>
      </div>
    );
  }
});

module.exports = MutualLikes;
