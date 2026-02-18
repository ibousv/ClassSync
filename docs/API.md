# API Documentation

## Overview

ClassSync provides REST and GraphQL APIs through Payload CMS, plus custom endpoints for real-time features.

## Authentication

All API requests require authentication via JWT token.

### Login

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "username": "johndoe",
    "role": "student"
  }
}
```

### Using Token

Include token in Authorization header:

```http
Authorization: Bearer {token}
```

## Collections API

### Users

**List Users**
```http
GET /api/users
```

**Get User**
```http
GET /api/users/{id}
```

**Update User**
```http
PATCH /api/users/{id}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe"
}
```

### Modules

**List Modules**
```http
GET /api/modules
```

**Create Module**
```http
POST /api/modules
Content-Type: application/json

{
  "name": "Java Programming",
  "code": "JAVA101",
  "totalHours": 60,
  "color": "#3b82f6"
}
```

### Resources

**List Resources**
```http
GET /api/resources?where[module][equals]={moduleId}
```

**Create Resource**
```http
POST /api/resources
Content-Type: application/json

{
  "title": "Introduction to Java",
  "description": "Basic concepts",
  "module": "{moduleId}",
  "type": "notes",
  "file": "{mediaId}",
  "author": "{userId}"
}
```

**Increment Views**
```http
PATCH /api/resources/{id}
Content-Type: application/json

{
  "views": 15
}
```

### Homework

**List Homework**
```http
GET /api/homework?sort=-dueDate
```

**Create Homework**
```http
POST /api/homework
Content-Type: application/json

{
  "title": "Java Assignment 1",
  "description": "Complete exercises 1-10",
  "module": "{moduleId}",
  "dueDate": "2026-02-15T23:59:59Z",
  "priority": "high"
}
```

**Mark as Complete**
```http
PATCH /api/homework/{id}
Content-Type: application/json

{
  "completedBy": ["{userId1}", "{userId2}"]
}
```

### Channels

**List Channels**
```http
GET /api/channels
```

**Create Channel**
```http
POST /api/channels
Content-Type: application/json

{
  "name": "java-help",
  "description": "Java programming help",
  "module": "{moduleId}",
  "type": "public"
}
```

## Custom Endpoints

### Messages

**Send Message**
```http
POST /api/messages
Content-Type: application/json

{
  "content": "Hello everyone!",
  "channelId": "{channelId}",
  "authorId": "{userId}"
}
```

Response:
```json
{
  "id": "msg123",
  "content": "Hello everyone!",
  "author": "{userId}",
  "channel": "{channelId}",
  "createdAt": "2026-02-08T19:30:00Z"
}
```

**Get Channel Messages**
```http
GET /api/messages?channelId={channelId}
```

Response:
```json
{
  "docs": [
    {
      "id": "msg123",
      "content": "Hello everyone!",
      "author": {...},
      "createdAt": "2026-02-08T19:30:00Z"
    }
  ],
  "totalDocs": 50,
  "limit": 50
}
```

### Reactions

**Add Reaction**
```http
POST /api/reactions
Content-Type: application/json

{
  "type": "helpful",
  "targetType": "resource",
  "targetId": "{resourceId}",
  "authorId": "{userId}"
}
```

**Get Reactions**
```http
GET /api/reactions?targetType=resource&targetId={resourceId}
```

Response:
```json
{
  "docs": [
    {
      "id": "react123",
      "type": "helpful",
      "author": {...},
      "createdAt": "2026-02-08T19:30:00Z"
    }
  ]
}
```

### Feed

**Get Activity Feed**
```http
GET /api/feed?filter=all&limit=20
```

Query Parameters:
- `filter` - `all`, `resource`, `homework` (default: `all`)
- `limit` - Number of items (default: `20`)

Response:
```json
[
  {
    "id": "res123",
    "type": "resource",
    "title": "Introduction to Java",
    "author": {...},
    "timestamp": "2026-02-08T19:30:00Z",
    "module": {...}
  },
  {
    "id": "hw456",
    "type": "homework",
    "title": "Java Assignment 1",
    "author": "System",
    "timestamp": "2026-02-08T19:25:00Z",
    "module": {...}
  }
]
```

## Query Parameters

### Filtering

```http
GET /api/resources?where[module][equals]={moduleId}
GET /api/homework?where[priority][equals]=high
```

### Sorting

```http
GET /api/resources?sort=-createdAt
GET /api/homework?sort=dueDate
```

Prefix with `-` for descending order.

### Pagination

```http
GET /api/resources?limit=10&page=2
```

### Population

```http
GET /api/resources?depth=1
```

Populates relationship fields.

## Real-time Events

### Subscribing to Events

```javascript
import { subscribeToChannel } from '@/lib/pusher/client'

const channel = subscribeToChannel('feed')
channel.bind('new-resource', (data) => {
  console.log('New resource:', data)
})
```

### Event Payloads

**new-resource**
```json
{
  "id": "res123",
  "type": "resource",
  "title": "Introduction to Java",
  "author": "{userId}",
  "timestamp": "2026-02-08T19:30:00Z",
  "module": "{moduleId}"
}
```

**new-homework**
```json
{
  "id": "hw456",
  "type": "homework",
  "title": "Java Assignment 1",
  "timestamp": "2026-02-08T19:30:00Z",
  "module": "{moduleId}",
  "dueDate": "2026-02-15T23:59:59Z"
}
```

**new-message**
```json
{
  "id": "msg123",
  "content": "Hello everyone!",
  "author": {...},
  "createdAt": "2026-02-08T19:30:00Z"
}
```

**new-reaction**
```json
{
  "id": "react123",
  "type": "helpful",
  "author": {...}
}
```

## Error Handling

### Error Response Format

```json
{
  "error": "Error message",
  "details": [...]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are rate-limited to prevent abuse. Limits vary by endpoint and user role.

## GraphQL API

Payload also provides a GraphQL API at `/api/graphql`.

### Example Query

```graphql
query {
  Resources(where: { module: { equals: "moduleId" } }) {
    docs {
      id
      title
      author {
        username
      }
      module {
        name
      }
    }
  }
}
```

### Example Mutation

```graphql
mutation {
  createResource(data: {
    title: "Introduction to Java"
    module: "moduleId"
    type: "notes"
    file: "mediaId"
    author: "userId"
  }) {
    id
    title
  }
}
```
