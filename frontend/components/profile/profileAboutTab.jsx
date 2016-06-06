var React = require('react');
var PropTypes = React.PropTypes;

var ProfileAboutTab = React.createClass({

  render: function() {
    return (
      <div>
        <div id='right-column'>
          <div id='looking-for'>
            looking for
          </div>

          <div id='details'>
            my details
          </div>
        </div>

        <label>
          <p className='about-title'>My Self Summary</p>
          <i
            className="fa fa-pencil"
            aria-hidden="true"
            >
          </i>


          <textarea />
        </label>

        <label>
          <p className='about-title'>What I’m doing with my life</p>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              >
            </i>

          <textarea />
        </label>

        <label>
          <p className='about-title'>I’m really good at</p>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              >
            </i>

          <textarea />
        </label>

        <label>
          <p className='about-title'>Favorite books, movies, shows, music, and food</p>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              >
            </i>

          <textarea />
        </label>

        <label>
          <p className='about-title'>The six things I could never do without</p>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              >
            </i>

          <textarea />
        </label>

        <label>
          <p className='about-title'>I spend a lot of time thinking about</p>

            <i
              className="fa fa-pencil"
              aria-hidden="true"
              >
            </i>

          <textarea />
        </label>

        <label>
          <p className='about-title'>On a typical Friday night I am</p>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              >
            </i>

          <textarea />
        </label>

        <label>
          <p className='about-title'>You should message me if</p>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              >
            </i>

          <textarea />
        </label>
      </div>
    );
  }

});

module.exports = ProfileAboutTab;
