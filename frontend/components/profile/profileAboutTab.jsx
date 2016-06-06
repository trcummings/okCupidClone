var React = require('react');
var PropTypes = React.PropTypes;
var AboutStore = require('../../stores/aboutStore');
var ClientActions = require('../../actions/clientActions');
var SessionStore = require('../../stores/sessionStore');

var ProfileAboutTab = React.createClass({
  getInitialState: function () {
    var currentUserAbout = AboutStore.currentUserAbout();
    return ({
      currentUserAbout: currentUserAbout
    });
  },

  componentDidMount: function () {
    this.aboutListener = AboutStore.addListener(function () {
      var currentUserAbout = AboutStore.currentUserAbout();
      this.setState({
        currentUserAbout: currentUserAbout
      });
    }.bind(this));

    ClientActions.getCurrentUserAbout(SessionStore.currentUser());
  },

  componentWillUnmount: function () {
    this.aboutListener.remove();
  },

  renderEachSection: function () {
    var aboutDetail = this.state.currentUserAbout;
    var fieldList = [
      'My Self Summary',
      'What I’m doing with my life',
      'I’m really good at',
      'Favorite books, movies, shows, music, and food',
      'The six things I could never do without',
      'I spend a lot of time thinking about',
      'On a typical Friday night I am',
      'You should message me if'
     ];
     var result = [];
     var i = 0;

    if (this.state.currentUserAbout.id) {
      for (var property in aboutDetail) {
        if (aboutDetail.hasOwnProperty(property) && property !== 'id') {
          result.push(
            <li key={i}>
              <p className='about-title'>{fieldList[i]}</p>
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                >
              </i>
              <p className='info-box'>{aboutDetail[property]}</p>
            </li>
          );
          i++;
        }
      }

      return result;
    } else {
      return (<div />);
    }
  },

  render: function() {
    return (
      <div id='about-tab'>
        <div id='right-column'>
          <div id='looking-for'>
            <h1>I'm looking for</h1>

          </div>

          <div id='details'>
            <h1>My details</h1>

          </div>
        </div>

        <ul id='about-list'>
          {this.renderEachSection()}
        </ul>
      </div>
    );
  }

});

module.exports = ProfileAboutTab;
