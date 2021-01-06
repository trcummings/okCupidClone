var HelperUtil = {
  parseNameField: function (string) {
    var type,
      atSignIdx = string.indexOf("@");

    if (atSignIdx === -1) {
      type = "username";
    } else {
      type = "email";
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

    if (todayMonth < birthMonth - 1) {
      age--;
    }

    if (birthMonth - 1 == todayMonth && todayDay < birthDay) {
      age--;
    }
    return age;
  },

  birthdayList: {
    months: {
      January: 31,
      February: 29,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    },
  },

  dateRange: function (endNum) {
    var result = [];

    for (var i = 1; i < endNum; i++) {
      result.push(i);
    }

    return result;
  },

  monthConvert: {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  },

  possibleGenders: {
    genders: ["Anime Enthusiast", "Man", "Woman", "NonBinary"],
  },

  doesCurrentUserLikeThisUser: function (currentUser, otherUser) {
    var likedUsers = currentUser.likees;
    var targetUser;

    likedUsers.forEach(function (user) {
      if (user.username === otherUser.username) {
        targetUser = user;
      }
    });

    if (targetUser) {
      return true;
    } else {
      return false;
    }
  },

  getRandomQuestion: function (callback) {
    $.ajax({
      url: "/api/questions/random",
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (question) {
        callback(question);
      },
    });
  },
};

export default HelperUtil;
