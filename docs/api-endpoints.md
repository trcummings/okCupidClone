# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `GET /api/users` -match index/feed
- `GET /api/users/new`
- `GET /api/users/:id` -gets a specific user (current user's profile/match detail)
- `POST /api/users`
- `PATCH /api/users` - update user info

### Session

- `GET /api/session/new`
- `POST /api/session`
- `DELETE /api/session`

### Likes

- `GET /api/likes`
- `POST /api/likes`
- `DELETE /api/likes/:id`

### Questions

- `GET /api/questions/:id`

### Answers

- `GET /api/answers`
- `PATCH /api/answers/`
- `DELETE /api/answers/`

### Visits

- `GET /api/visits`
- `POST /api/vists`
- `DELETE /api/visits/:id`

### Messages

- `GET /api/messages`
- `POST /api/messages`
- `PATCH /api/messages/:id`

### Pictures

- `GET /api/pictures`
- `GET /api/pictures/:id`
- `POST /api/pictures`
- `DELETE /api/pictures/:id`
