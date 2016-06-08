var React = require('react');
var PropTypes = React.PropTypes;
var WhoLikesYou = require('./whoLikesYou');
var MutualLikes = require('./mutualLikes');
var WhoYouLike = require('./whoYouLike');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');

var Tabs = ({
  0: function () {
    return (<WhoLikesYou />);
  },
  1:function () {
    return (<div>shatty tatty</div>);
    // return (<MutualLikes />);
  },
  2:function () {
    return (<WhoYouLike />);
  },
});

var LikesMain = React.createClass({
  getInitialState: function () {
    return {
      selectedTab: 0,
      tabOneSelected: 'selectedTab',
      tabTwoSelected: '',
      tabThreeSelected: ''
    };
  },

  selectTab: function (event) {
    event.preventDefault();

    if (event.target.value === 0) {
      this.setState(
        {
          selectedTab: event.target.value,
          tabOneSelected: 'selectedTab',
          tabTwoSelected: '',
          tabThreeSelected: ''
        }
      );
    } else if (event.target.value === 1) {
      this.setState(
        {
          selectedTab: event.target.value,
          tabOneSelected: '',
          tabTwoSelected: 'selectedTab',
          tabThreeSelected: ''
        }
      );
    } else if (event.target.value === 2) {
      this.setState(
        {
          selectedTab: event.target.value,
          tabOneSelected: '',
          tabTwoSelected: '',
          tabThreeSelected: 'selectedTab'
        }
      );
    }
  },

  renderTab: function () {
    return Tabs[this.state.selectedTab]();
  },

  render: function() {
    return (
      <div id='likes-main' className='group'>
        <section id='likes-header' className='group'>
          <h1>Likes</h1>

          <ul className='page-tabs'>
            <li
              value={0}
              onClick={this.selectTab}
              id={this.state.tabOneSelected}
              >
              Who Likes You
            </li>

            <li
              value={1}
              onClick={this.selectTab}
              id={this.state.tabTwoSelected}
              >
              Mutual Likes
            </li>
            <li
              value={2}
              onClick={this.selectTab}
              id={this.state.tabThreeSelected}
              >
              Who You Like
            </li>
          </ul>
        </section>

        <div className='likes-monolith'>
          <div id='main-column'>
            {this.renderTab()}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = LikesMain;
