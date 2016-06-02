var React = require('react'),
    UserStore = require('../../stores/userStore'),
    ClientActions = require('../../actions/clientActions'),
    MatchesIndexItem = require('./matchesIndexItem'),
    SessionStore = require('../../stores/sessionStore');

var MatchesIndex = React.createClass({
  getInitialState: function () {
    return ({ allMatches: UserStore.allUsers() });
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(function () {
      this.setState({ allMatches: UserStore.allUsers() });
    }.bind(this));

    ClientActions.fetchAllPossibleMatches();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  handleSortByChange: function () {
    // don't even do shit yet
  },

  matchDetailClick: function () {
    // don't even do shit at all, b
  },

  render: function () {
    var matches = this.state.allMatches;

    return (
      <div id='match-index'>
        <div id='match-monolith'>
          <label
            id='sort-by-dropdown'
            onBlur={this.handleSortByChange}>
            <span>Sort by </span>
            <select onChange={this.handleSortByChange}>
              <option value="Special Blend">Special Blend</option>
              <option value="Match Percentage">Match Percentage</option>
              <option value="How Many Mouths and Feets">How Many Mouths and Feets</option>
            </select>
          </label>

          <div id='match-results'>
          {
            matches.map(function (match, index) {
              return (
                <MatchesIndexItem
                  id='match-index-item'
                  key={index}
                  user={match}
                  onClick={this.matchDetailClick}
                />
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MatchesIndex;
