var SignUpActions = require('../actions/signUpActions');

UserAuthApiUtil = {
  getLocationByZip: function (zipCode) {
    var client = new XMLHttpRequest();
    client.open("GET", "http://api.zippopotam.us/us/" + zipCode, true);
    client.onreadystatechange = function() {
    	if (client.readyState == 4) {
        SignUpActions.receiveLocationByZip(client.responseText);
    	}
    };

    client.send();
  }
};

module.exports = UserAuthApiUtil;
