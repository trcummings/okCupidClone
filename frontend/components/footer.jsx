var React = require('react');
var PropTypes = React.PropTypes;

var Footer = React.createClass({

  render: function() {
    return (
      <footer id='profile-footer' className='group'>
        <section>
          <ul className='footer-links'>
            <li>
              <a href='https://github.com/trcummings'>
                Creator's Github
              </a>
            </li>
            <li>
              <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                Free Bitcoin
              </a>
            </li>
          </ul>

          <p className='footer-copyright'>
            <a href='#/matches'>
              <i className="fa fa-creative-commons" aria-hidden="true"></i>
              PerfectPair 2016
            </a>
          </p>
        </section>

        <div>
        </div>
      </footer>
    );
  }

});

module.exports = Footer;
