var React = require('react');
var PropTypes = React.PropTypes;
var LikeStore = require('../../stores/likeStore');

var LikeToggle = React.createClass({
  getInitialState: function () {
    return({
      liked: false
    });
  },

  toggleLike: function (event) {
    event.preventDefault();

    if (this.state.liked) {
      this.setState({ liked: false });
    } else {
      this.setState({ liked: true });
    }
  },

  render: function () {

    if (this.state.liked) {
      return (
        <button
          type='submit'
          id='like-toggle'
          onClick={this.toggleLike}
          className='liked'
          >

          <i className='fa fa-star' aira-hidden='hidden'></i>
          Liked
        </button>
      );
    } else {
      return (
        <button
          type='submit'
          id='like-toggle'
          onClick={this.toggleLike}
          className='not-liked'
          >
          <i className='fa fa-star' aira-hidden='hidden'></i>

          Like
        </button>
      );
    }
  }

});

module.exports = LikeToggle;

// getInitialState: function () {
//   return { likeText: LikeStore.currentLikeText() };
// },
//
// componentDidMount: function () {
//   this.likeListener = LikeStore.addListener(function () {
//     this.setState({ likeText: LikeStore.currentLikeText() });
//   }.bind(this));
//
//   ClientActions.checkIfLikedUser(this.props.targetUser);
// },
//
// toggleLike: function (event) {
//   event.preventDefault();
//
//   ClientActions.toggleLikeUser(this.props.targetUser);
// },
//
// render: function () {
//   return (
//     <button
//       id='like-toggle'
//       className={LikeStore.doesCurrentUserLikeThisUser()}
//       onClick={this.toggleLike}
//     >
//       <i class="fa fa-star" aria-hidden="true"></i>
//       {LikeStore.currentLikeText()}
//     </button>
//   );
// }
