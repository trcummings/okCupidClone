# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Users Cycles

### Users API Request Actions

* `fetchAllUsers`

* `fetchSingleUser`

* `updateUser`

### Users API Response Actions

* `recieveAllUsers`

* `recieveSingleUser`

### User Store Listeners

* `NotesIndex` component listens to `Note` store.
* `NoteDetail` component listens to `Note` store.


## Likes Cycle

### Likes API Request Actions

* `fetchAllLikes`

* `createVisit`

* `removeVisit`

### Likes API Response Actions

### Like Store Listeners






## Questions Cycle

### Questions API Request Actions

* `fetchSingleQuestion`
  0. invoked from `QuestionsDetail` and `Feed`, `componentDidMount`
  0. `GET /api/questions/id` is called
  0. `getCurrentQuestion` is set as the callback









## Answers Cycle

### Answers API Request Actions

* `fetchAnsweredQuestions`
  0. invoked from `QuestionsDetail`, `componentDidMount`
  0. `GET /api/answers/` is called with a `user_id` and a `question_id`
  0. `getAllAnswers` is set as the callback

* `fetchSharedAnswers`
  0. invoked from `MatchesDetailQuestions`, `onClick`
  0. `GET /api/answers/` is called with two `user_id` params
  0. `getAllAnswers` is set as the callback

* `createAnswer`
  0. invoked from `QuestionsForm`, `onSubmit`
  0. `POST /api/answers/` is called with a `user_id` and a `question_id`
  0. `getAllAnswers` is set as the callback.

* `updateAnswer`
  0. invoked from `QuestionsForm`, `onSubmit`
  0. `PATCH /api/answers/:id` is called
  0. `updateAnswer` is set as the callback.

* `destroyAllAnswers`
  0. invoked from `QuestionsDetail` delete all answers button, `onClick`
  0. `DELETE /api/answers/` is called with a `user_id`
  0. `getAllAnswers` is set as the callback

### Answers API Response Actions

* `recieveAnsweredQuestions`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change

* `recieveSharedAnswers`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change

* `receiveCreatedAnswer`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change.

* `receiveCreatedAnswer`
  0. invoked from an API callback.
  0. `Answer` store updates `_answers` and emits change.

* `receiveCreatedAnswer`
  0. invoked from an API callback.
  0. `Answer` store resets `_answers` and emits change.

### Answer Store Listeners

* `MatchesDetailQuestions` component listens to `Answer` store.
* `QuestionsDetail` component listens to `Answer` store.
* `QuestionsForm` component listens to `Answer` store.





## Visits Cycle

### Visits API Request Actions

* `fetchAllVisits`

* `createVisit`

* `removeVisit`

### Visits API Response Actions

### Visit Store Listeners













## Note Cycles

### Matches API Request Actions

* `fetchAllUsers`
  0. invoked from `MatchesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/matches` is called.
  0. `receiveAllUsers` is set as the callback.
<!--
* `createNote`
  0. invoked from new note button `onClick`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the callback. -->

* `fetchSingleUser`
  0. invoked from `MatchDetail` `didMount`/`willReceiveProps`
  0. `GET /api/users/:id` is called.
  0. `receiveSingleNote` is set as the callback.

* `updateUserAbout`
  0. invoked from `AboutDetailItemForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveSingleNote` is set as the callback.

* `updateUserDescription`
  0. invoked from `DescriptionDetailItemForm` `onSubmit`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the callback.

* `destroyUser`
  0. invoked from delete profile button `onClick`
  0. `DELETE /api/notes/:id` is called.
  0. `removeNote` is set as the callback.








### Notes API Response Actions

* `receiveAllNotes`
  0. invoked from an API callback.
  0. `Note` store updates `_notes` and emits change.

* `receiveSingleNote`
  0. invoked from an API callback.
  0. `Note` store updates `_notes[id]` and emits change.

* `removeNote`
  0. invoked from an API callback.
  0. `Note` store removes `_notes[id]` and emits change.

### Store Listeners

* `NotesIndex` component listens to `Note` store.
* `NoteDetail` component listens to `Note` store.


## Question Cycles

### Question API Request Actions

* `fetchAllQuestions`
  0. invoked from `NotebooksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks` is called.
  0. `receiveAllNotebooks` is set as the callback.

* `createNotebook`
  0. invoked from new notebook button `onClick`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `fetchSingleNotebook`
  0. invoked from `NotebookDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks/:id` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `updateNotebook`
  0. invoked from `NotebookForm` `onSubmit`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `destroyNotebook`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/notebooks/:id` is called.
  0. `removeNotebook` is set as the callback.

### Notebooks API Response Actions

* `receiveAllNotebooks`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks` and emits change.

* `receiveSingleNotebook`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks[id]` and emits change.

* `removeNotebook`
  0. invoked from an API callback.
  0. `Notebook` store removes `_notebooks[id]` and emits change.

### Store Listeners

* `NotebooksIndex` component listens to `Notebook` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when there is text
  0. `GET /api/notes` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
