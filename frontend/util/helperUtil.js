var HelperUtil = {
  parseNameField: function (string) {
    var type,
        atSignIdx = string.indexOf('@');

    if (atSignIdx === -1) {
      type = 'username';
    } else {
      type = 'email';
    }
    return type;
  }
};

module.exports = HelperUtil;
