var React = require('react'),
    Modal = require("react-modal"),
    BasicInfoEditForm = require('../forms/basicInfoEditForm');

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
    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          ref='popup'
        >
          <BasicInfoEditForm />
        </Modal>

        <button
          onClick={this.openModal}
          className='profile-edit-button'
        >
          Edit Details
        </button>
      </div>
    );
  }

});

module.exports = BasicInfoEditModal;
