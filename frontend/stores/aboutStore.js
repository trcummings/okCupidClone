import { Store } from "flux/utils";

import AppDispatcher from "../dispatcher/dispatcher";
import AboutConstants from "../constants/aboutConstants";

var _currentUserAbout = {};
var AboutStore = new Store(AppDispatcher);

AboutStore.currentUserAbout = function () {
  return _currentUserAbout;
};

AboutStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AboutConstants.CURRENT_USER_ABOUT:
      _currentUserAbout = payload.userAbout;
      this.__emitChange();
      break;
  }
};

export default AboutStore;
