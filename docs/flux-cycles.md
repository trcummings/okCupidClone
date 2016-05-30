## Users Cycles

### Users API Request Actions

* `fetchAllUsers`
  0. invoked from `MatchesIndex`, `onClick`
  0. `GET /users` is called
  0. `getAllUsers` is set as the callback

* `fetchSingleUser`
  0. invoked from `ProfileIndex` and `MatchesDetail`, `onClick`
  0. `GET /users/:id` is called
  0. `getThisUser` is set as the callback

* `updateUser`
  0. invoked from `DetailForm` and `AccountSettingForm` and `DescriptionItemForm`, `onClick`
  0. `PATCH /users/:id` is called
  0. `getThisUser` is set as the callback

### Users API Response Actions

* `recieveAllUsers`
  0. invoked from an API callback.
  0. `User` store resets `_users` and emits change.

* `recieveSingleUser`
  0. invoked from an API callback.
  0. `User` store resets `_users` and emits change.

### User Store Listeners

* `MatchesIndex` component listens to `Note` store.
* `MatchesDetail` component listens to `Note` store.
* `AboutItem` component listens to `Note` store.
* `AccountDetail` component listens to `Note` store.


## Likes Cycle

### Likes API Request Actions

* `fetchAllLikes`
  0. invoked from `LikesIndex`, `onClick`
  0. `GET /api/likes` is called.
  0. `getAllLikes` is set as the callback.

* `createLike`
  0. invoked from `LikeToggle`, `onClick`
  0. `POST /api/likes` is called with a `likee_id` param.
  0. `getOneLike` is set as the callback.

* `removeLike`
  0. invoked from `LikeToggle`, `onClick`
  0. `DELETE /api/likes/:id` is called.
  0. `getOneLike` is set as the callback.

### Likes API Response Actions

* `recieveAllLikes`
  0. invoked from API callback.
  0. `Like` store updates `_likes` and emits change.

* `recieveCreatedLike`
  0. invoked from API callback.
  0. `Like` store updates `_likes` and emits change.

### Like Store Listeners
  * `LikeToggle` component listens to `Like` store
  * `LikesIndex` component listens to `Like` store

## Questions Cycle

### Questions API Request Actions

* `fetchSingleQuestion`
  0. invoked from `QuestionsDetail` and `Feed`, `componentDidMount`.
  0. `GET /api/questions/id` is called.
  0. `getCurrentQuestion` is set as the callback.

### Questions API Response Actions

* `recieveSingleQuestion`
  0. invoked from an API callback.
  0. `Question` store resets `_questions` and emits change.

### Question Store Listeners
  * `QuestionsDetail` and `Feed` components listen to `Question` store.


## Answers Cycle

### Answers API Request Actions

* `fetchAnsweredQuestions`
  0. invoked from `QuestionsDetail`, `componentDidMount`.
  0. `GET /api/answers/` is called with a `user_id` and a `question_id`.
  0. `getAllAnswers` is set as the callback.

* `fetchSharedAnswers`
  0. invoked from `MatchesDetailQuestions`, `onClick`.
  0. `GET /api/answers/` is called with two `user_id` params.
  0. `getAllAnswers` is set as the callback.

* `createAnswer`
  0. invoked from `QuestionsForm`, `onSubmit`.
  0. `POST /api/answers/` is called with a `user_id` and a `question_id`.
  0. `getAllAnswers` is set as the callback.

* `updateAnswer`
  0. invoked from `QuestionsForm`, `onSubmit`.
  0. `PATCH /api/answers/:id` is called.
  0. `updateAnswer` is set as the callback.

* `destroyAllAnswers`
  0. invoked from `QuestionsDetail` delete all answers button, `onClick`.
  0. `DELETE /api/answers/` is called with a `user_id`.
  0. `getAllAnswers` is set as the callback.

### Answers API Response Actions

* `recieveAnsweredQuestions`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change.

* `recieveSharedAnswers`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change.

* `receiveCreatedAnswer`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change.

### Answer Store Listeners

* `MatchesDetailQuestions` component listens to `Answer` store.
* `QuestionsDetail` component listens to `Answer` store.
* `QuestionsForm` component listens to `Answer` store.


## Visits Cycle

### Visits API Request Actions

* `fetchAllVists`
  0. invoked from `VisitorsIndex`, `onClick`
  0. `GET /api/visits` is called.
  0. `getAllVisits` is set as the callback.

* `createVisit`
  0. invoked from `MatchesDetail`, `onClick`
  0. `POST /api/visits` is called with a `visitee_id` param.
  0. `getAllVisits` is set as the callback.

### Visits API Response Actions

* `recieveAllLikes`
  0. invoked from API callback.
  0. `Like` store updates `_visits` and emits change.

* `recieveCreatedLike`
  0. invoked from API callback.
  0. `Like` store updates `_visits` and emits change.

### Visit Store Listeners
  * `VisitorsIndex` component listens to `Visit` store
  * `MatchesDetail` component listens to `Visit` store


## Messages Cycle

### Messages API Request Actions

  * `fetchAllMessages`
    0. invoked from `MessagesIndex`, `onClick`
    0. `GET /api/messages` is called.
    0. `getAllMessages` is set as the callback

  * `creatChatlog`
    0. invoked from `MessagesItemDetail`, `onHitEnter`
    0. `POST /api/messages` is called with a `reciever_id` param.
    0. `getConversation` is set as the callback

  * `fetchChatlog`
    0. invoked from `MessagesItem`, `onClick`
    0. `GET /api/messages/:id`
    0. `getConversation` is set as the callback.

  * `appendChatlog`
    0. invoked from `MessagesItemDetail`, `onHitEnter`
    0. `PATCH /api/messages/`
    0. `getConversation` is set as the callback.

### Messages API Response Actions

  * `recieveAllMessages`
    0. invoked from API callback.
    0. `Message` store updates `_messages` and emits change.

  * `recieveChatlog`
    0. invoked from API callback.
    0. `Message` store updates `_messages` and emits change.

### Message Store Listeners
  * `MessagesIndex` component listens to `Messages` store.
  * `MessagesItem` component listens to `Messages` store.
  * `MessagesItemDetail` component listens to `Messages` store.

## Pictures Cycle

### Pictures API Request Actions

  * `getAllPictures`
    0. invoked from `MatchesDetail` and `Profile`, `onClick`
    0. `GET /api/pictures`
    0. `getAllPictures` is set as the callback.

  * `deletePicture`
    0. invoked from `PhotoForm`, `onSubmit`
    0. `DELETE /api/pictures`
    0. `getAllPictures` is set as the callback.

### Pictures API Response Actions

  * `recieveAllPictures`
    0. invoked from API callback.
    0. `Picture` store updates `_pictures` and emits change.

  * `recieveAllPictures`
    0. invoked from API callback.
    0. `Picture` store updates `_pictures` and emits change.

### Picture Store Listeners
  * `MatchesDetail` component listens to `Pictures` store.
  * `Profile` component listens to `Pictures` store.
