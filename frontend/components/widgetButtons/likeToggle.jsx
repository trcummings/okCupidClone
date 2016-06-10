var React = require('react');
var Modal = require('react-modal');
var PropTypes = React.PropTypes;
var HelperUtil = require('../../util/helperUtil');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');
var MessageButton = require('../messages/messageButton');

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
    width: '600px',
    height: '360px',
    top: '180px',
    fontSize: '13px',
    textAlign: 'center',
    marginBottom: '60px',
    marginLeft: '-355px',
    left: '50%',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '8px',
    outline                    : 'none',
  }
};

var LikeToggle = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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

  handleClickOnThem: function (event) {
    event.preventDefault();
    this.closeModal();
    this.context.router.push('/profile/' + this.props.likee.username);
  },

  handleClickOnYou: function () {
    event.preventDefault();
    this.closeModal();
    this.context.router.push('/profile');
  },

  render: function () {
    var myPic;
    var theirPic;

    if (this.props.liker.photos[0].photo_url === '') {
      myPic = window.anon;
    } else {
      myPic = this.props.liker.photos[0].photo_url;
    }

    if (this.props.likee.default_photo_url === '') {
      theirPic = window.anon;
    } else {
      theirPic = this.props.likee.default_photo_url;
    }

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
            <div className='like-modal'>

              <h1>You like eachother!</h1>

              <section className='mut-like-pics'>
                <section className='mut-like-pic'>
                  <img
                    onClick={this.handleClickOnThem}
                    src={theirPic} />
                </section>

                <section className='mut-like-pic'>
                  <img
                    onClick={this.handleClickOnYou}
                    src={myPic} />
                </section>
              </section>

              <h3>Now is the perfect time to send eachother a message</h3>
              <section className='message-them-buttons group'>


                <button className='not-now'
                  onClick={this.closeModal}
                >
                  Not Now
                </button>

                <div className='message-them'>
                  <MessageButton targetUser={this.props.likee}/>
                </div>
              </section>

            </div>
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
