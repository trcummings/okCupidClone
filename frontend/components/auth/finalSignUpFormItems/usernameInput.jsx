var React = require("react");
var ClientActions = require("../../../actions/clientActions");
var AuthInfoStore = require("../../../stores/authInfoStore");

var UsernameInput = React.createClass({
  getInitialState: function () {
    return {
      uniqueUsernameVerified: "not yet verified",
      usernameValidityMsg: "",
    };
  },

  runUsernameValidation: function (username) {
    if (this.state.uniqueUsernameVerified === "not yet verified") {
      this.setState({ usernameValidityMsg: "...verifying" });

      ClientActions.checkForUniqueUsername(
        username,
        function (result, username) {
          if (result) {
            this.setState({
              uniqueUsernameVerified: "invalid",
            });
          } else {
            this.setState({
              uniqueUsernameVerified: "valid",
              username: username,
            });
          }

          this.runUsernameValidation(username);
        }.bind(this)
      );
    } else if (this.state.uniqueUsernameVerified === "invalid") {
      this.setState({ usernameValidityMsg: "Username already in use!" });
    } else if (this.state.uniqueUsernameVerified === "valid") {
      this.setState({ usernameValidityMsg: "" });
      AuthInfoStore.addInfoPiece("username", username);
    }
  },

  handleUsernameChange: function (event) {
    if (event.target.value !== "") {
      this.setState({ uniqueUsernameVerified: "not yet verified" });
      this.runUsernameValidation(event.target.value);
    } else {
      this.setState({ usernameValidityMsg: "You need a username!" });
    }
  },

  render: function () {
    return (
      <div className="row group">
        <label
          className="username text_box_item form_three_item"
          onBlur={this.handleUsernameChange}
        >
          Username
          <input
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="This will be public"
          />
        </label>

        <span className="username-validity-msg">
          {this.state.usernameValidityMsg}
        </span>
      </div>
    );
  },
});

module.exports = UsernameInput;
