var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var MessageStore = new Store(AppDispatcher);
var MessageConstants = require("../constants/messageConstants");

_conversations = [];
var _activeConvos = [];

MessageStore.allConversations = function () {
  return _conversations;
};

MessageStore.activeConvos = function () {
  return _activeConvos;
};

MessageStore.closeConvo = function (convo_name) {
  var convoIdx;

  _activeConvos.forEach(function (convo, index) {
    if (convo.conversation_name === convo_name) {
      convoIdx = index;
    }
  });

  _activeConvos.splice(convoIdx, 1);
};

MessageStore.addConvo = function (payloadConvo) {
  var inConvos = false;
  var inActvConvos = false;

  _conversations.forEach(function (convo, index) {
    if (convo.conversation_name === payloadConvo.conversation_name) {
      inConvos = true;
      _conversations[index] = payloadConvo;
    }
  });

  _activeConvos.forEach(function (convo, index) {
    if (convo.conversation_name === payloadConvo.conversation_name) {
      inActvConvos = true;
      _activeConvos[index] = payloadConvo;
    }
  });

  if (!inConvos) {
    _conversations.push(payloadConvo);
  }
  if (!inActvConvos) {
    _activeConvos.push(payloadConvo);
  }
};

MessageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case MessageConstants.RECEIVE_ALL_CONVOS:
      _conversations = payload.conversations;
      this.__emitChange();
      break;
    case MessageConstants.RECEIVE_CONVO:
      this.addConvo(payload.conversation);
      this.__emitChange();
      break;
    case MessageConstants.GET_ALL_CONVOS:
      _conversations = payload.conversations;
      this.__emitChange();
      break;
    case MessageConstants.RECEIVE_MESSAGE:
      _conversations.forEach(function (convo, index) {
        if (
          convo.conversation_name ===
          payload.message.conversation.conversation_name
        ) {
          convo.messages.push(payload.message);
        }
      });

      _activeConvos.forEach(function (convo, index) {
        if (
          convo.conversation_name ===
          payload.message.conversation.conversation_name
        ) {
          convo.messages.push(payload.message);
        }
      });

      this.__emitChange();
      break;
    case MessageConstants.CLOSE_CONVO:
      this.closeConvo(payload.convo_name);
      this.__emitChange();
      break;
  }
};

module.exports = MessageStore;
