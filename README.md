# PerfectPair

[[https://github.com/trcummings/PerfectPair/app/assets/images/perfectpair-withshadow.png]]

Are you a singleton and ready to mingle a ton?

PerfectPair is a full-stack web app clone of dating platform OKcupid. It features a Ruby on Rails, a PostgreSQL database, and a dynamic frontend, frameworked via React.js using Flux architecture.

* [Live Here!][heroku]
* [My Linkedin][linkedin]
* [My Portfolio Page][portfolio]

[heroku]: www.perfect-pair.me
[linkedin]: www.linkedin.com/in/thomsencummings
[portfolio]: www.thomsencummings.com

## Features & Implementation

### Single-Page Interface

Apart from the initial Auth, all pages on PerfectPair are reactive content delivered on a static page. The root div listens to the flux stores, and renders each component based on listeners and callbacks which dynamically update the react DOM, keeping the content moving and the interface a delight to use. All information is kept on the back end, and brought through in limited scope through API calls. In fact, the only public data is the kind of data that you would want people to see. No table row ids, no emails, all user specific stuff is handled on the back end and queried/interpreted through back end functionality. The routes are even designed around using usernames as params. Because all of this info is public, it doesn't matter how malicious the intent, no user can reach past the scope they've already been given.

```ruby
    get '/', to: 'users#get_user'
    post '/', to: 'users#create_user'
    patch '/', to: 'users#update_user'

    get '/user/conversations/:username', to: 'users#get_conversation'
    get '/users/:username', to: 'users#other_user'
    get '/users/:username/photos', to: 'users#other_user_photos'
    get '/users/:username/about', to: 'users#other_user_about'
  ```

### Websocket Based Messaging Services

The Pusher API affords an asynchronous connection between the backend and the frontend, letting users message each other, have conversations in real time, without navigating away from their current page.

```JavaScript
componentDidMount: function () {
  var node = ReactDOM.findDOMNode(this);
  node.scrollTop = node.scrollHeight;
  var convo = this.state.convo;

  this.pusher = new Pusher('[REDACTED]', {
    encrypted: true
  });

  var channel = this.pusher.subscribe(convo.conversation_name);
  channel.bind('message_sent', function(data) {
    ClientActions.openConversation(receiver);

  }.bind(this));
},

componentWillUpdate: function() {
  var node = ReactDOM.findDOMNode(this);
  this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
},

componentDidUpdate: function() {
  if (this.shouldScrollBottom) {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }
},
```

### Question Answering and Matching Algorithm

  While the actual calculation for determining answer similarity is kept on the backend for the sake of simplicity and discreteness, the public nature of question answering and explaining your answers, as well as the relative desirability of each answer means each user could technically get a good approximaton of how much of a match they are with someone by looking at their answers. However, nobody has time for any of that nonsense! We do it for you!

  ```Ruby
    my_ratio = my_running_total.to_f / my_total
    their_ratio = their_running_total.to_f / their_total

    Math.sqrt(my_ratio * their_ratio) * 100
  ```

  Every time a user answers a question, they point out which answers they'd like to see, and weight the importance of those answers with a basic four-point scale, ranging from `irrelevant` to `dealbreaker`.

  These results are stored (and easily editable on the user's profile page) and compared with each user in the displayed group of matches. Question answering provides an instant update of your match percentage with each user, meaning you can totally game your questions if you wanted to, but buddy, that's not how love works.

  On the database side, the questions are joined on a question choices table, referring to the answers through a series of foreign keys. the importance and answered choices are queried based on all the questions that both you and the other user have answered!

  The question display is almost absurdly complex (but the code isn't hard to read!). On one single `ProfileQuestionsTab`, you can answer questions, skip a question you don't want to answer, re-answer a question, add/edit an explanation, and have it all change instantaneously!

## Future Directions for the Project

### Location Services

Integrating location services and filtering by desired qualities is the next big move for PerfectPair. Constraining matches by location will afford a much greater degree of scalability, all while providing a much more individualized service for users. The weighted matching algorithm is by no means computationally heavy, especially considering the query itself has been screened for N+1 dangers.

### Blocking Users

It's a dating site, which brings out both the best and the worst in people. Sometimes you need to block someone. This can be handled with a simple join table in the database, and a couple of booleans.
