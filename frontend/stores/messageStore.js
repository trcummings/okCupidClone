var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var MessageStore = new Store(AppDispatcher);
var MessageConstants = require('../constants/messageConstants');

var _conversations = [];
var _activeConvos = [];

MessageStore.allConversations = function () {
  return _conversations;
};

MessageStore.activeConvos = function () {
  return _activeConvos;
};

MessageStore.closeConvo = function (username) {

};

MessageStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case MessageConstants.RECEIVE_CONVO:
      _conversations.push(payload.conversation);
      _activeConvos.push(payload.conversation);
      this.__emitChange();
      break;
    case MessageConstants.GET_ALL_CONVOS:
      _conversations = payload.conversations;
      this.__emitChange();
      break;
    case MessageConstants.RECEIVE_MESSAGE:
      _conversations.forEach(function (convo, index) {
        if (convo.conversation_name === payload.message.conversation.conversation_name) {
          _conversations[index].messages.push(payload.message);
        }
      });

      this.__emitChange();
      break;
  }
};

module.exports = MessageStore;
