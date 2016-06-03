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
  },

  returnAge: function (date) {
    var todayDate = new Date(),
        todayYear = todayDate.getFullYear(),
        todayMonth = todayDate.getMonth(),
        todayDay = todayDate.getDate(),
        dateArray = date.split("-"),
        birthYear,
        birthMonth,
        birthDay;

    dateArray.push(dateArray.shift());
    birthYear = dateArray[2];
    birthMonth = dateArray[0];
    birthDay = dateArray[1];

    age = todayYear - birthYear;

    if (todayMonth < birthMonth - 1)
    {
      age--;
    }

    if (birthMonth - 1 == todayMonth && todayDay < birthDay)
    {
      age--;
    }
    return age;
  },

  birthdayList: {
    months: {
      january: {},
      february: {},
      march: {},
      april: {},
      may: {},
      june: {},
      july: {},
      september: {},
      october: {},
      november: {},
      december: {}
    }
  }
};

module.exports = HelperUtil;
