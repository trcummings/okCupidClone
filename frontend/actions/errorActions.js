var AppDispatcher = require("../dispatcher/dispatcher");
var ErrorConstants = require("../constants/errorConstants");

ErrorActions = {
  setErrors: function (form, errors) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: errors,
      form: form,
    });
  },

  clearErrors: function () {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS,
    });
  },
};

module.exports = ErrorActions;
