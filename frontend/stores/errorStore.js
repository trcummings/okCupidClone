import { Store } from "flux/utils";

import AppDispatcher from "../dispatcher/dispatcher";

var ErrorConstants = require("../constants/errorConstants");
var ErrorStore = new Store(AppDispatcher);

var _errors = {};
var _form = "";

ErrorStore.formErrors = function (form) {
  if (form !== _form) {
    return {};
  }

  var result = {};

  var errors;
  Object.keys(_errors).forEach(function (field) {
    errors = _errors[field];
    result[field] = errors.slice();
  });

  return result;
};

ErrorStore.form = function () {
  return _form.slice();
};

ErrorStore.errorsArray = function () {
  var result = [];

  Object.keys(_errors).forEach(function (field) {
    result.push(_errors[field]);
  });

  return result;
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _errors = payload.errors;
      _form = payload.form;
      ErrorStore.__emitChange();
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _errors = {};
      _form = "";
      ErrorStore.__emitChange();
      break;
  }
};

export default ErrorStore;
