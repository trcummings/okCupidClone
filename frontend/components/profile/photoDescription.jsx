var React = require("react");
var ClientActions = require("../../actions/clientActions");

var PhotoDescription = React.createClass({
  getInitialState: function () {
    return {
      editing: false,
      description: "",
    };
  },

  toggleEditing: function (event) {
    event.preventDefault();

    if (this.state.editing) {
      this.setState({ editing: false });
    } else {
      this.setState({ editing: true });
    }
  },

  handleDescriptionChange: function (event) {
    event.preventDefault();

    this.setState({ description: event.target.value });
  },

  handleSave: function (event) {
    event.preventDefault();

    ClientActions.updatePhotoDescription({
      photo: this.props.photo,
      newDescription: this.state.description,
    });

    this.toggleEditing(event);
  },

  handleCancel: function (event) {
    event.preventDefault();

    this.setState({ description: "" });
    this.toggleEditing(event);
  },

  renderDescription: function () {
    result = [];

    if (this.props.photo.description) {
      result.push(<p key={0}>{this.props.photo.description}</p>);
      result.push(
        <button key={1} onClick={this.toggleEditing}>
          edit description
        </button>
      );
    } else {
      result.push(
        <button key={0} onClick={this.toggleEditing}>
          add description
        </button>
      );
    }

    return result;
  },

  render: function () {
    if (this.state.editing) {
      return (
        <form>
          <label>
            Description
            <textarea
              onChange={this.handleDescriptionChange}
              defaultValue={this.props.photo.description}
            />
            <button className="save-button" onClick={this.handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={this.handleCancel}>
              Cancel
            </button>
          </label>
        </form>
      );
    } else {
      return <section>{this.renderDescription()}</section>;
    }
  },
});

module.exports = PhotoDescription;
