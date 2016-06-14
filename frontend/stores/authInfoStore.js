var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var AuthInfoConstants = require('../constants/authInfoConstants');

var _tentativeProfile = {};
var _zipLocation = "";
var _authState = 'first';
var bdayValid = false;
var zipCodeValid = false;
var emailValid = false;
var isEmailUnique = null;

var AuthInfoStore = new Store(AppDispatcher);

AuthInfoStore.addInfoPiece = function (type, info) {
  _tentativeProfile[type] = info;
};

AuthInfoStore.zipLocation = function () {
  return _zipLocation;
};

AuthInfoStore.returnFinalizedProfile = function () {
  return _tentativeProfile;
};

AuthInfoStore.birthdateIsValid = function(birth_date) {
  var returnString = '';
  var dateArray = [
    parseInt(birth_date.yyyy),
    parseInt(birth_date.mm),
    parseInt(birth_date.dd)
  ];

  dateArray.forEach(function (date) {
    if (isNaN(date)) {
      returnString = 'indecipherable';
    }
  });

  if (returnString === 'indecipherable') {
    return returnString;
  }

  var userDate = new Date(dateArray);
  var dateToday = new Date();

  var ageDiff = Math.abs(dateToday.getFullYear() - userDate.getFullYear());

  if (ageDiff < 18) {
    returnString = 'tooYoung';
  } else if (ageDiff > 99){
    returnString = 'tooOld';
  }

  return returnString;
};

AuthInfoStore.currentAuthState = function () {
  return _authState;
};

AuthInfoStore.nextAuthState = function () {
  if (_authState === 'first') {
    _authState = 'second';
  } else if (_authState === 'second') {
    _authState = 'final';
  }
};

AuthInfoStore.handleZipInput = function (locationData) {
  if (locationData['post code']) {
    var place = locationData.places[0];

    this.addInfoPiece('zip_code', locationData['post code']);
    this.addInfoPiece(
      'location',
      place['place name'] + ', ' + place['state abbreviation']
    );
    _zipLocation = place['place name'] + ', ' + place['state abbreviation'];
  } else {
    _zipLocation = 'no match';
  }
};

AuthInfoStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AuthInfoConstants.ADD_INFO:
      this.addInfoPiece(payload.type, payload.info);
      this.__emitChange();
      break;
    case AuthInfoConstants.ADD_ZIP:
      this.handleZipInput(payload.locationData);
      this.__emitChange();
      break;
    case AuthInfoConstants.NEXT_AUTH_STATE:
      this.nextAuthState();
      this.__emitChange();
      break;
    }
};

module.exports = AuthInfoStore;


//// notes:
// if a piece of info is invalid, give that html item a selector of "invalid"
// if it is valid, give it 'valid' as a selector
// later, those will become red x's and green checkmarks
