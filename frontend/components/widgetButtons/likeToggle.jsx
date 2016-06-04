var React = require('react');
var PropTypes = React.PropTypes;
var LikeStore = require('../../stores/likeStore');

var LikeToggle = React.createClass({

  render: function () {
    return (
      <button
        id='like-toggle'
      >
        <i class="fa fa-star" aria-hidden="true"></i>
        Like
      </button>
    );
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
