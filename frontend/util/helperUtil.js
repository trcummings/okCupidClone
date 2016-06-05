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
      January: {},
      February: {},
      March: {},
      April: {},
      May: {},
      June: {},
      July: {},
      September: {},
      October: {},
      November: {},
      December: {}
    }
  },

  monthConvert: {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }
};

// <option value="Anime Enthusiast">Anime Enthusiast</option>

module.exports = HelperUtil;
