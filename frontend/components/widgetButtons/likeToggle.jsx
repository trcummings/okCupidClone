var React = require('react');
var Modal = require('react-modal');
var PropTypes = React.PropTypes;
var HelperUtil = require('../../util/helperUtil');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');

var modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.60)',
    zIndex: 1000000
  },
  content : {
    zIndex: 1000001,
    align: 'center',
    display: 'block',
    position: 'relative',
    width: '214px',
    height: '378px',
    top: '180px',
    marginBottom: '60px',
    marginLeft: '-155px',
    fontSize: '13px',
    textAlign: 'center',
    left: '50%',
    padding: '28px 48px 40px',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '8px',
    outline                    : 'none',
  }
};

var LikeToggle = React.createClass({
  getInitialState: function () {
    Modal.setAppElement(document.body);
    return({
      liked: HelperUtil.doesCurrentUserLikeThisUser(this.props.liker, this.props.likee),
      buttonActive: true,
      modalOpen: false
    });
  },

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

  openModal: function () {
    this.setState({ modalOpen: true });
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

        var isMutualLike = false;
        this.props.liker.mutual_likes.forEach(function (user, index) {
          if (user.username === this.props.likee.username) {
            isMutualLike = true;
          }
        }.bind(this));

        if (isMutualLike) {
          this.openModal();
        }

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

          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            ref='popup'
            style={modalStyle}
          >
            <div>NyYYYYYYEEEEAAAARRRRGHHHHH</div>
          </Modal>
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
