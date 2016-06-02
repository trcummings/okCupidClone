var React = require('react'),
    Modal = require("react-modal"),
    BasicInfoEditForm = require('../forms/basicInfoEditForm'),
    HelperUtil = require('../../../util/helperUtil');

var modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.60)'
  },
  content : {
    align: 'center',
    display: 'block',
    position: 'relative',
    width: '214px',
    height: '378px',
    top: '40px',
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

var BasicInfoEditModal = React.createClass({
  getInitialState: function(){
    Modal.setAppElement(document.body);
    return({
      modalOpen: false,
    });
  },

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
  },


  render: function() {
    var currentUser = this.props.user;

    return (
      <div onClick={this.openModal}>
        <ul>
          <li>{currentUser.location}</li>

          <li>{HelperUtil.returnAge(currentUser.birth_date)} </li>

          <li>{currentUser.gender}</li>

          <i className="fa fa-pencil" aria-hidden="true"></i>
        </ul>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          ref='popup'
        >
          <BasicInfoEditForm />
        </Modal>
      </div>
    );
  }

});

module.exports = BasicInfoEditModal;
