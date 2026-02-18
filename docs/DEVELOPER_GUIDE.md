# Developer Guide

## Getting Started

This guide helps developers extend ClassSync with new features, collections, and components.

## Project Architecture

ClassSync follows a modular architecture:

```
Backend (Payload CMS) ←→ API Layer ←→ Frontend (Lit Components)
         ↓                    ↓                    ↓
    PostgreSQL           Pusher              Web Browser
```

## Adding New Collections

### 1. Create Collection File

Create a new file in `src/payload/collections/`:

```typescript
// src/payload/collections/Events.ts
import type { CollectionConfig } from 'payload'
import { isAuthenticated, isAdminOrDelegate } from '../access'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'type'],
  },
  access: {
    read: isAuthenticated,
    create: isAdminOrDelegate,
    update: isAdminOrDelegate,
    delete: isAdminOrDelegate,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Exam', value: 'exam' },
        { label: 'Trip', value: 'trip' },
        { label: 'Meeting', value: 'meeting' },
      ],
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
    },
  ],
}
```

### 2. Register Collection

Add to `src/payload/payload.config.ts`:

```typescript
import { Events } from './collections/Events'

export default buildConfig({
  collections: [
    Users,
    Media,
    Modules,
    Resources,
    Homework,
    Channels,
    Messages,
    Comments,
    Reactions,
    Events, // Add here
  ],
  // ...
})
```

### 3. Generate Types

```bash
pnpm payload generate:types
```

Types are auto-generated in `src/types/payload-types.ts`.

### 4. Use in API

```typescript
const payload = await getPayloadClient()

const events = await payload.find({
  collection: 'events',
  where: {
    date: {
      greater_than: new Date(),
    },
  },
})
```

## Adding Custom Access Control

### Create Access Function

Add to `src/payload/access/index.ts`:

```typescript
export const canManageEvents: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'delegate') return true
  
  // Custom logic
  return user.permissions?.includes('manage-events')
}
```

### Use in Collection

```typescript
export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: isAuthenticated,
    create: canManageEvents,
    update: canManageEvents,
    delete: canManageEvents,
  },
  // ...
}
```

## Adding Hooks

### Create Hook

Create `src/payload/hooks/afterEventChange.ts`:

```typescript
import { AfterChangeHook } from 'payload'
import { triggerEvent } from '@/lib/pusher/server'

export const afterEventChange: AfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation === 'create') {
    await triggerEvent('feed', 'new-event', {
      id: doc.id,
      type: 'event',
      title: doc.title,
      date: doc.date,
    })
  }

  return doc
}
```

### Register Hook

```typescript
import { afterEventChange } from '../hooks/afterEventChange'

export const Events: CollectionConfig = {
  slug: 'events',
  hooks: {
    afterChange: [afterEventChange],
  },
  // ...
}
```

## Adding Custom Fields

### Create Field Component

Create `src/payload/fields/ColorPicker.ts`:

```typescript
import type { Field } from 'payload'

export const colorPicker: Field = {
  name: 'color',
  type: 'text',
  admin: {
    components: {
      Field: '@/payload/components/ColorPickerField',
    },
  },
  validate: (value) => {
    if (!/^#[0-9A-F]{6}$/i.test(value)) {
      return 'Invalid color format'
    }
    return true
  },
}
```

### Use in Collection

```typescript
import { colorPicker } from '../fields/ColorPicker'

export const Events: CollectionConfig = {
  fields: [
    // ...
    colorPicker,
  ],
}
```

## Adding API Routes

### Create Route Handler

Create `src/app/api/events/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const upcoming = searchParams.get('upcoming') === 'true'

    const payload = await getPayloadClient()

    const events = await payload.find({
      collection: 'events',
      where: upcoming
        ? {
            date: {
              greater_than: new Date(),
            },
          }
        : {},
      sort: 'date',
    })

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
```

### Use in Frontend

```typescript
const response = await fetch('/api/events?upcoming=true')
const events = await response.json()
```

## Adding Lit Components

### 1. Create Component

Create `src/components/events/cs-event-card.ts`:

```typescript
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

interface EventData {
  id: string
  title: string
  date: string
  type: string
  module?: string
}

@customElement('cs-event-card')
export class CsEventCard extends LitElement {
  @property({ type: Object }) event!: EventData

  static styles = css`
    :host {
      display: block;
    }

    .card {
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      padding: 1rem;
    }

    .title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .meta {
      font-size: 0.875rem;
      color: #666;
    }
  `

  render() {
    return html`
      <div class="card">
        <div class="title">${this.event.title}</div>
        <div class="meta">
          ${this.event.date} • ${this.event.type}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-event-card': CsEventCard
  }
}
```

### 2. Export Component

Add to `src/components/index.ts`:

```typescript
export * from './events/cs-event-card'
```

### 3. Use Component

```typescript
import '@/components/events/cs-event-card'

// In your template
<cs-event-card .event=${eventData}></cs-event-card>
```

## Adding Real-time Features

### 1. Trigger Events from Backend

```typescript
import { triggerEvent } from '@/lib/pusher/server'

await triggerEvent('events', 'event-updated', {
  id: event.id,
  title: event.title,
})
```

### 2. Subscribe in Component

```typescript
import { subscribeToChannel } from '@/lib/pusher/client'

connectedCallback() {
  super.connectedCallback()
  
  const channel = subscribeToChannel('events')
  channel.bind('event-updated', (data) => {
    this.handleEventUpdate(data)
  })
}

disconnectedCallback() {
  super.disconnectedCallback()
  unsubscribeFromChannel('events')
}
```

## Adding Custom Validation

### Field-level Validation

```typescript
{
  name: 'email',
  type: 'text',
  validate: (value) => {
    if (!value.includes('@')) {
      return 'Invalid email address'
    }
    return true
  },
}
```

### Collection-level Validation

```typescript
export const Events: CollectionConfig = {
  slug: 'events',
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (new Date(data.date) < new Date()) {
          throw new Error('Event date must be in the future')
        }
        return data
      },
    ],
  },
  // ...
}
```

## Adding Relationships

### One-to-Many

```typescript
{
  name: 'author',
  type: 'relationship',
  relationTo: 'users',
  required: true,
}
```

### Many-to-Many

```typescript
{
  name: 'attendees',
  type: 'relationship',
  relationTo: 'users',
  hasMany: true,
}
```

### Polymorphic

```typescript
{
  name: 'relatedTo',
  type: 'relationship',
  relationTo: ['resources', 'homework', 'events'],
}
```

## Adding Custom Endpoints

### Create Endpoint

Create `src/app/api/stats/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  const payload = await getPayloadClient()

  const [resources, homework, users] = await Promise.all([
    payload.count({ collection: 'resources' }),
    payload.count({ collection: 'homework' }),
    payload.count({ collection: 'users' }),
  ])

  return NextResponse.json({
    resources: resources.totalDocs,
    homework: homework.totalDocs,
    users: users.totalDocs,
  })
}
```

## Testing New Features

### Unit Test Example

Create `tests/unit/events.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { validateEventDate } from '@/lib/events'

describe('Event Validation', () => {
  it('should reject past dates', () => {
    const pastDate = new Date('2020-01-01')
    expect(() => validateEventDate(pastDate)).toThrow()
  })

  it('should accept future dates', () => {
    const futureDate = new Date('2030-01-01')
    expect(() => validateEventDate(futureDate)).not.toThrow()
  })
})
```

### Run Tests

```bash
pnpm test
```

## Plugin System

### Create Plugin

Create `src/payload/plugins/analytics.ts`:

```typescript
import type { Plugin } from 'payload'

export const analyticsPlugin: Plugin = (config) => {
  return {
    ...config,
    hooks: {
      ...config.hooks,
      afterChange: [
        ...(config.hooks?.afterChange || []),
        async ({ doc, collection }) => {
          console.log(`Document changed in ${collection}:`, doc.id)
          return doc
        },
      ],
    },
  }
}
```

### Use Plugin

```typescript
import { analyticsPlugin } from './plugins/analytics'

export default buildConfig({
  plugins: [analyticsPlugin],
  // ...
})
```

## Best Practices

### 1. Type Safety

Always use TypeScript and generated types:

```typescript
import type { Event } from '@/types/payload-types'

const event: Event = await payload.findByID({
  collection: 'events',
  id: eventId,
})
```

### 2. Error Handling

```typescript
try {
  const result = await payload.create({
    collection: 'events',
    data: eventData,
  })
  return result
} catch (error) {
  console.error('Failed to create event:', error)
  throw new Error('Event creation failed')
}
```

### 3. Access Control

Always define access control for new collections:

```typescript
access: {
  read: isAuthenticated,
  create: isAdminOrDelegate,
  update: isOwnerOrAdmin,
  delete: isAdmin,
}
```

### 4. Documentation

Document new features in appropriate files:
- API changes → `docs/API.md`
- Architecture changes → `docs/ARCHITECTURE.md`
- New components → Component file JSDoc

### 5. Commit Convention

Follow conventional commits:

```bash
git commit -m "feat(events): add event management system"
git commit -m "fix(calendar): resolve date display issue"
git commit -m "docs(api): document events endpoint"
```

## Common Patterns

### Pagination

```typescript
const events = await payload.find({
  collection: 'events',
  page: 1,
  limit: 10,
})
```

### Filtering

```typescript
const events = await payload.find({
  collection: 'events',
  where: {
    type: { equals: 'exam' },
    date: { greater_than: new Date() },
  },
})
```

### Sorting

```typescript
const events = await payload.find({
  collection: 'events',
  sort: '-date', // Descending
})
```

### Population

```typescript
const events = await payload.find({
  collection: 'events',
  depth: 2, // Populate nested relationships
})
```

## Debugging

### Enable Debug Logs

```typescript
// In payload.config.ts
export default buildConfig({
  debug: process.env.NODE_ENV === 'development',
  // ...
})
```

### Inspect Database Queries

```typescript
const payload = await getPayloadClient()
payload.logger.info('Fetching events...')
```

## Resources

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Lit Documentation](https://lit.dev/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Pusher Documentation](https://pusher.com/docs)

## Getting Help

- Check existing issues on GitHub
- Review documentation
- Ask in GitHub Discussions
- Join community channels
