var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _tentativeProfile = {};
var _potentialEmail = "";
var _confirmedEmail = "";

var AuthInfoStore = new Store(AppDispatcher);
var AuthInfoConstants = require('../constants/sessionConstants');

SessionStore.addInfoPiece = function (type, info) {
  _tentativeProfile[type] = info;
};

SessionStore.confirmSameEmail = function () {
  if (_potentialEmail === _confirmationEmail) {
    return true;
  } else {
    return false;
  }
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case AuthInfoConstants.ADD_INFO:
      this.addInfoPiece(payload.type, payload.info);
      this.__emitChange();
      break;
  }
};

module.exports = AuthInfoStore;


//// notes:
// if a piece of info is invalid, give that html item a selector of "invalid"
// if it is valid, give it 'valid' as a selector
// later, those will become red x's and green checkmarks
