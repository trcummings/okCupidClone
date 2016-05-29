# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users` -match index/feed
- `GET /users/new`
- `GET /users/:id` -gets a specific user (current user's profile/match detail)
- `POST /users`
- `PATCH /users` - update user info

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

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
