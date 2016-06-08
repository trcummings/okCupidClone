# PerfectPair

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.perfectpair.herokuapp.com

## Minimum Viable Product

Are you a singleton and ready to mingle a ton?

PerfectPair will be a full-stack web app clone of dating platform OKcupid, with the cutesy gimmick of being code-language and programmer culture-centric. Its backend will sit on Ruby on Rails, with a PostgreSQL database, and a dynamic frontend, frameworked via React.js using Flux architecture.

By the end of app/Academy week 9, this app will meet the following criteria for minimum viable functionality:

- [x] New account creation, login, and
- [ ] guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] Question answering
- [x] Editable user profile with pictures and personal information
- [x] Ability to view and 'like' other profiles
- [ ] Dynamic notifications of profile views and likes
- [ ] A match percentage between each user, algorithmically determined
- [ ] A websocket based messenger platform, for users to communicate
- [ ] A user search feature, allowing filtration based on certain qualities
- [ ] Hosting on Heroku
- [ ] CSS styling that looks exactly like okCupid, except with a shittier logo, and a barely visible superimposition of Richard Stallman's face haunting the background (maybe not).
- [ ] A production README, replacing this dogshit README

## Product Goals and Priorities

PerfectPair will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account (MVP)
- [x] Log in / Log out (MVP)
- [ ] including as a Guest/Demo User (MVP)
- [x] Edit Profile About, Profile Description (MVP)
- [x] View Other Profiles (MVP)
- [ ] Answer Questions (MVP)
- [ ] View Match Percentages Between Users (MVP)
- [ ] Add and Remove Profile Pictures (MVP)
- [ ] Message Between Users (MVP)
- [ ] Receive Notifications Upon Other Users Viewing Their Profiles (expected feature, but not MVP)
- [ ] Filter Users by 'Looking For' and 'Description' (expected feature, but not MVP)
- [ ] OAuth connection
- [ ] User Search (bonus feature)
- [ ] Block/Hide Users (bonus feature)
- [ ] Delete Message Logs (bonus feature)
- [ ] "Enemy" percentages available on profiles
- [x] Fail to Get Me Any Dates (100% expected feature)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Profiles, API, and basic APIUtil (1.5 days)

**Objective:** Profiles can be read, edited and destroyed through
the API.

- [x] create `ProfileAbout` model
- [ ] create `ProfileDetails` model
- [ ] create `ProfileLookingFor` model
- [x] create `Like` model
- [ ] create `Visit` model
- [x] create `UserPhoto` model
- [x] seed the database with a small amount of test data
- [ ] CRUD API for Profile, Like, Visit (`ProfilesController`, `LikesController` , `VisitsController`)
- [x] jBuilder views for profiles
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Likes and Visits can be created, and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each note component, building out the flux loop as needed.
- [x] create `LikeToggle` button with CRUD and API interaction

### Phase 4: MatchesIndex and MatchDetails (1 Day)

**Objective:** User can view other profiles, by navigating through the `HeaderNav`

- [x] setup the MatchesIndex component, and flesh out each profile view
- [ ] create mutual like modal, pops up on `LikeToggle` when two users like each-other

### Phase 5: Questions, Answers, Match Percentages (2 Days)

**Objective:** User can answer questions on their profile page, see the questions other users have answered, answer those questions on the other users' profile page, and see their match percentage with those users

- [x] create `Question` model
- [ ] create jbuilder question and answer views
- [ ] implement Answer components, with API interaction on `Profile` and `MatchDetail`
- [ ] add match percentages to all `MatchDetailItem`s

### Phase 6: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles

### Phase 7: Feed (1 Day)

**Objective:** User can navigate to a feed index, and see the most current updates, as well as view a selection of matches, and answer a random question on the Feed page

- [ ] make `Feed` and all its components

### Phase 8: Messages (2 days)

**Objective:** Users can send messages to one-another

- [ ] create `ChatLog` model
- build out API, Flux loop, and components for:
- Use CSS to style new views

### Phase 9: Advanced Styling (1 day)

**Objective:** Make all this shit look gooooooood

### Bonus Features (TBD)
- [ ] User Search Feature
- [ ] Block Users
- [ ] Delete Conversations
- [ ] Quickmatch Page
- [x] Crippling Depression

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md
