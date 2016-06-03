var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var MessageStore = new Store(AppDispatcher);
var MessageConstants = require('../constants/messageConstants');

var _chatlog = {};

MessageStore.returnChatlog = function (otherUser) {
  return [];
};

MessageStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case MessageConstants.GET_CHATLOG:
    _chatlog[payload.channel] = [];
      payload.messages.forEach(function (message) {
        _chatlog[payload.channel].push(message);
      });
      break;
    case MessageConstants.NEW_MESSAGE:
      break;
  }
  this.__emitChange();
};

module.exports = MessageStore;
