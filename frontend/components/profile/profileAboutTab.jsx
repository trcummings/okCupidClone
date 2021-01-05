var React = require("react");
var PropTypes = React.PropTypes;
var AboutStore = require("../../stores/aboutStore");
var ClientActions = require("../../actions/clientActions");
var SessionStore = require("../../stores/sessionStore");

var ProfileAboutTab = React.createClass({
  getInitialState: function () {
    var currentUserAbout = AboutStore.currentUserAbout();

    return {
      currentUserAbout: currentUserAbout,
      editArray: [],
      newAbout: {},
    };
  },

  componentDidMount: function () {
    this.editArray = [];
    this.aboutListener = AboutStore.addListener(
      function () {
        var currentUserAbout = AboutStore.currentUserAbout();
        this.setState({
          currentUserAbout: currentUserAbout,
        });
      }.bind(this)
    );

    ClientActions.getCurrentUserAbout();
  },

  componentWillUnmount: function () {
    this.aboutListener.remove();
  },

  toggleEditForm: function (i) {
    var newEditArray = this.state.editArray;
    newEditArray.push(i);

    this.setState({ editArray: newEditArray });
  },

  cancelForm: function (i) {
    var idx = this.editArray.indexOf(i);
    var newEditArray = this.state.editArray;
    newEditArray.splice(idx, 1);

    this.setState({
      editArray: newEditArray,
    });
  },

  submitForm: function (propertyName, i, event) {
    event.preventDefault();

    ClientActions.updateCurrentUserAbout(this.state.newAbout);

    var newState = {};

    this.setState({
      newAbout: newState,
    });

    var idx = this.editArray.indexOf(i);
    var newEditArray = this.state.editArray;
    newEditArray.splice(idx, 1);
  },

  handleChange: function (propertyName, event) {
    event.preventDefault();
    var newState = {};
    newState[propertyName] = event.target.value;

    this.setState({
      newAbout: newState,
    });
  },

  editForm: function (i, property, title, propertyName) {
    return (
      <li key={i} className="group">
        <p className="about-title">{title}</p>
        <textarea
          id="about-detail-edit-form"
          defaultValue={property}
          onChange={this.handleChange.bind(this, propertyName)}
        ></textarea>
        <button
          className="submit-button"
          onClick={this.submitForm.bind(this, propertyName, i)}
        >
          Save
        </button>

        <button
          className="cancel-button"
          onClick={this.cancelForm.bind(this, i)}
        >
          Cancel
        </button>
      </li>
    );
  },

  renderEachSection: function () {
    var aboutDetail = this.state.currentUserAbout;
    var fieldList = [
      "My Self Summary",
      "What I’m doing with my life",
      "I’m really good at",
      "Favorite books, movies, shows, music, and food",
      "The six things I could never do without",
      "I spend a lot of time thinking about",
      "On a typical Friday night I am",
      "You should message me if",
    ];
    var result = [];
    var i = 0;

    if (this.state.currentUserAbout.hasOwnProperty("six_things")) {
      for (var property in aboutDetail) {
        if (aboutDetail.hasOwnProperty(property) && property !== "id") {
          if (this.state.editArray.indexOf(i) !== -1) {
            result.push(
              this.editForm(i, aboutDetail[property], fieldList[i], property)
            );

            i++;
          } else if (this.state.editArray.indexOf(i) === -1) {
            result.push(
              <li key={i} className="group">
                <p className="about-title">{fieldList[i]}</p>
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  onClick={this.toggleEditForm.bind(this, i)}
                ></i>
                <p className="info-box">{aboutDetail[property]}</p>
              </li>
            );
            i++;
          }
        }
      }

      return result;
    } else {
      return <div />;
    }
  },

  render: function () {
    if (this.state.currentUserAbout) {
      return (
        <div id="about-tab">
          <div id="right-column"></div>

          <ul id="about-list">{this.renderEachSection()}</ul>
        </div>
      );
    } else {
      return <div />;
    }
  },
});

module.exports = ProfileAboutTab;
