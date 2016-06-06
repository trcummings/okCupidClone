var React = require('react');
var PropTypes = React.PropTypes;

var Footer = React.createClass({

  render: function() {
    return (
      <footer id='profile-footer' className='group'>
        <ul className='footer-links'>
          <li>
            I AM A FOOTER
          </li>
        </ul>

        <p className='footer-copyright'>
          PerfectPair 2016 
        </p>
      </footer>
    );
  }

});

module.exports = Footer;
