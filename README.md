# FresherNote

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Are you a singleton and ready to mingle a ton?

[project name here] will be a full-stack web app clone of dating platform OKcupid. Its backend will sit on Ruby on Rails, with a PostgreSQL database, and a dynamic frontend, frameworked via React.js using Flux architecture.

By the end of app/Academy week 9, this app will meet the following criteria for minimum viable functionality:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] Question answering
- [ ] Editable user profile with pictures and personal information
- [ ] Ability to view and 'like' other profiles
- [ ] Dynamic notifications of profile views and likes
- [ ] A match percentage between each user, algorithmically determined
- [ ] A user search feature, allowing filtration based on certain qualities
- [ ] A websocket based messenger platform, for users to communicate
- [ ] Hosting on Heroku
- [ ] CSS styling that looks exactly like okCupid, except with a shittier logo, and a barely visible superimposition of Richard Stallman's face haunting the background (maybe not).
- [ ] A production README, replacing this dogshit README

## Product Goals and Priorities

[project name here] will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Edit Profile About, Profile Description (MVP)
- [ ] View Other Profiles (MVP)
- [ ] Recieve Notifications Upon Other Users Viewing Their Profiles (MVP)
- [ ] Answer Questions (MVP)
- [ ] View Match Percentages Between Users (MVP)
- [ ] Add and Remove Profile Pictures (MVP)
- [ ] Message Between Users (MVP)
- [ ] Filter Users by 'Looking For' and 'Description' (expected feature, but not MVP)
- [ ] User Search, Filtering (expected feature, but not MVP)
- [ ] Quickmatch Game (expected feature, but not MVP)
- [x] Fail to Get Me Any Dates (expected feature)

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

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Notes Model, API, and basic APIUtil (1.5 days)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [ ] create `Note` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`NotesController`)
- [ ] jBuilder views for notes
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Notes can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `NotesIndex`
  - [ ] `NoteIndexItem`
  - [ ] `NoteForm`
- [ ] save Notes to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Notebooks (1 day)

**Objective:** Notes belong to Notebooks, and can be viewed by notebook.

- [ ] create `Notebook` model
- build out API, Flux loop, and components for:
  - [ ] Notebook CRUD
  - [ ] adding notes requires a notebook
  - [ ] moving notes to a different notebook
  - [ ] viewing notes by notebook
- Use CSS to style new views

Phase 3 adds organization to the Notes. Notes belong to a Notebook,
which has its own `Index` view.

### Phase 6: Tags (1.5 days)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for notebook
  - [ ] adding tags to notebook
  - [ ] creating tags while adding to notebooks
  - [ ] searching notebooks by tag
- [ ] Style new elements

### Phase 7: Allow Complex Styling in Notes (0.5 days)

**objective:** Enable complex styling of notes.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Set reminders on notes
- [ ] Changelogs for Notes
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
