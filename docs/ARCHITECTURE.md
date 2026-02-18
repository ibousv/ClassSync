# Architecture Documentation

## Overview

ClassSync is built with a modern, scalable architecture designed for collaborative academic management. The system separates concerns between backend (Payload CMS), frontend (Lit Web Components), and real-time communication (Pusher).

## Technology Stack

### Backend
- **Payload CMS 3.0** - Headless CMS with built-in authentication
- **Next.js 15** - React framework for server-side rendering
- **PostgreSQL** - Relational database for data persistence
- **Vercel** - Serverless deployment platform

### Frontend
- **Lit 3.3** - Lightweight Web Components library
- **TypeScript** - Type-safe JavaScript
- **CSS-in-JS** - Component-scoped styling

### Real-time
- **Pusher** - WebSocket-based real-time messaging
- **Server-side triggers** - Event broadcasting from API routes
- **Client-side subscriptions** - Live updates in components

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Lit Components│  │ Pusher Client│  │  API Client  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Next.js API │  │ Pusher Server│  │ Payload Admin│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Data Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │ Vercel Blob  │  │ Payload CMS  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Data Model

### Core Collections

**Users**
- Authentication and profile management
- Role-based access (student, delegate, admin)
- Karma and badge system

**Modules**
- Course definitions (Java, PHP, C#, etc.)
- Total hours tracking
- Color coding for UI

**Resources**
- Course materials and documents
- Linked to modules
- View tracking and reactions

**Homework**
- Assignment management
- Due date tracking
- Completion status per student

**Channels**
- Chat room organization
- Public/private types
- Module-specific channels

**Messages**
- Real-time chat messages
- Channel-based organization
- Author tracking

**Comments**
- Feedback on resources and homework
- Threaded discussions
- Author attribution

**Reactions**
- Like, helpful, question types
- Applied to resources, comments, messages
- Real-time updates

**Media**
- File storage for uploads
- PDF and image support
- Access control

## Access Control

### Role Hierarchy

```
Admin
  ├─ Full system access
  ├─ User management
  └─ All CRUD operations

Delegate
  ├─ Homework management
  ├─ Module management
  ├─ Channel management
  └─ Content moderation

Student
  ├─ Resource creation
  ├─ Comment and reaction
  ├─ Message sending
  └─ Own content editing
```

### Permission Matrix

| Collection | Read | Create | Update | Delete |
|-----------|------|--------|--------|--------|
| Users | Auth | Admin | Owner/Admin | Admin |
| Modules | Auth | Admin/Del | Admin/Del | Admin/Del |
| Resources | Auth | Auth | Owner/Admin | Admin/Del |
| Homework | Auth | Admin/Del | Admin/Del | Admin/Del |
| Channels | Auth | Admin/Del | Admin/Del | Admin/Del |
| Messages | Auth | Auth | Owner/Admin | Owner/Admin |
| Comments | Auth | Auth | Owner/Admin | Owner/Admin |
| Reactions | Auth | Auth | Owner/Admin | Owner/Admin |
| Media | Auth | Auth | - | - |

## Real-time Events

### Event Types

**Feed Events**
- `feed:new-resource` - New resource uploaded
- `feed:new-homework` - New homework assigned

**Chat Events**
- `channel-{id}:new-message` - New message in channel

**Reaction Events**
- `{type}-{id}:new-reaction` - New reaction added

### Event Flow

```
User Action → API Route → Database Update → Pusher Trigger → Client Update
```

## Component Architecture

### Web Components

All UI components are built with Lit and follow these principles:

- **Encapsulation** - Shadow DOM for style isolation
- **Reactivity** - Automatic re-rendering on property changes
- **Events** - Custom events for parent communication
- **TypeScript** - Full type safety

### Component Hierarchy

```
cs-nav (Navigation)
  └─ Links to all sections

cs-feed (Activity Feed)
  └─ Feed items with filtering

cs-file-card (Resource Display)
  └─ Download and reaction buttons

cs-homework-item (Homework Display)
  └─ Progress bar and completion checkbox

cs-chat-window (Chat Interface)
  └─ Message list and input

cs-calendar (Calendar View)
  └─ Month/week toggle and events
```

## API Routes

### REST Endpoints

**Messages**
- `POST /api/messages` - Send message
- `GET /api/messages?channelId={id}` - Get channel messages

**Reactions**
- `POST /api/reactions` - Add reaction
- `GET /api/reactions?targetType={type}&targetId={id}` - Get reactions

**Feed**
- `GET /api/feed?filter={all|resource|homework}&limit={n}` - Get activity feed

### Payload Collections API

All collections are automatically exposed via Payload's REST and GraphQL APIs:

- `GET /api/{collection}` - List items
- `GET /api/{collection}/{id}` - Get single item
- `POST /api/{collection}` - Create item
- `PATCH /api/{collection}/{id}` - Update item
- `DELETE /api/{collection}/{id}` - Delete item

## Deployment

### Environment Variables

Required for production:

```
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SERVER_URL=https://...
PUSHER_APP_ID=...
PUSHER_KEY=...
PUSHER_SECRET=...
PUSHER_CLUSTER=...
NEXT_PUBLIC_PUSHER_KEY=...
NEXT_PUBLIC_PUSHER_CLUSTER=...
BLOB_READ_WRITE_TOKEN=...
```

### Vercel Deployment

1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push to main

### Database Setup

1. Provision PostgreSQL database
2. Set DATABASE_URI environment variable
3. Payload handles migrations automatically

## Security

### Authentication
- JWT-based session management
- Secure password hashing
- Email verification

### Authorization
- Role-based access control
- Field-level permissions
- Owner-based restrictions

### Data Protection
- Input validation and sanitization
- CSRF protection
- Rate limiting on API routes
- Secure headers (CSP, HSTS)

## Performance

### Optimization Strategies

- **Code Splitting** - Lazy loading of components
- **Caching** - Payload query caching
- **CDN** - Static asset delivery via Vercel
- **Database Indexing** - Optimized queries
- **Real-time** - WebSocket connections for live updates

### Monitoring

- Vercel Analytics for performance metrics
- Error tracking and logging
- Database query performance monitoring

## Extensibility

### Adding New Collections

1. Create collection file in `src/payload/collections/`
2. Define fields and access control
3. Add to `payload.config.ts`
4. Run type generation

### Adding New Components

1. Create component in `src/components/`
2. Define properties and events
3. Export from `index.ts`
4. Use in pages

### Adding Real-time Features

1. Create API route with Pusher trigger
2. Subscribe to channel in component
3. Handle events and update UI

## Testing Strategy

### Unit Tests
- Component logic testing
- Utility function testing
- Access control testing

### Integration Tests
- API endpoint testing
- Database operation testing
- Authentication flow testing

### E2E Tests
- User flow testing
- Cross-browser testing
- Real-time feature testing
