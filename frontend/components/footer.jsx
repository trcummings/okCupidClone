var React = require("react");
var PropTypes = React.PropTypes;
var MessageStore = require("../stores/messageStore");
var MessageBox = require("./messages/messageBox");

var Footer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { activeConvos: MessageStore.activeConvos() };
  },

  componentDidMount: function () {
    var activeConvos;

    this.messageListener = MessageStore.addListener(
      function () {
        activeConvos = MessageStore.activeConvos();

        this.setState({
          activeConvos: activeConvos,
        });
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.messageListener.remove();
  },

  renderMessageBoxes: function () {
    if (this.state.activeConvos.length > 0) {
      return this.state.activeConvos.map(
        function (convo, index) {
          return <MessageBox key={index} convo={convo} />;
        }.bind(this)
      );
    } else {
      return <div />;
    }
  },

  render: function () {
    return (
      <footer id="profile-footer" className="group">
        <section className="message-boxes">{this.renderMessageBoxes()}</section>

        <section>
          <ul className="footer-links">
            <li>
              <a href="https://github.com/trcummings">Creator's Github</a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                Free Bitcoin
              </a>
            </li>
          </ul>

          <p className="footer-copyright">
            <a href="#/matches">
              <i className="fa fa-creative-commons" aria-hidden="true"></i>
              PerfectPair 2016
            </a>
          </p>
        </section>

        <div></div>
      </footer>
    );
  },
});

module.exports = Footer;
