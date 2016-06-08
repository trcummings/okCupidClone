var React = require('react');
var PropTypes = React.PropTypes;
var HelperUtil = require('../../util/helperUtil');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');

var LikeToggle = React.createClass({
  getInitialState: function () {

    return({
      liked: HelperUtil.doesCurrentUserLikeThisUser(this.props.liker, this.props.likee),
      buttonActive: true
    });
  },

  toggleLike: function (event) {
    var liker = this.props.liker;
    event.preventDefault();

    if (this.state.liked) {
      ClientActions.unlikeUser(this.props.likee, function () {
          this.setState({ buttonActive: true });
        }.bind(this)
      );

      this.setState({
        liked: false,
        buttonActive: false
       });

    } else {
      ClientActions.likeUser(this.props.likee, function () {
        this.setState({ buttonActive: true });
      }.bind(this));
      this.setState({
        liked: true,
        buttonActive: false
       });
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
