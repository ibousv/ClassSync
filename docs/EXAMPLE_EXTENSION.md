# Example: Adding a Notifications System

This example demonstrates how to extend ClassSync with a complete notifications feature.

## Step 1: Create Collection

Create `src/payload/collections/Notifications.ts`:

```typescript
import type { CollectionConfig } from 'payload'
import { isAuthenticated, isOwner } from '../access'

export const Notifications: CollectionConfig = {
  slug: 'notifications',
  admin: {
    useAsTitle: 'message',
    defaultColumns: ['message', 'recipient', 'read', 'createdAt'],
  },
  access: {
    read: ({ req: { user }, data }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { recipient: { equals: user.id } }
    },
    create: isAuthenticated,
    update: isOwner,
    delete: isOwner,
  },
  fields: [
    {
      name: 'message',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },
    {
      name: 'recipient',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}
```

## Step 2: Register Collection

Add to `src/payload/payload.config.ts`:

```typescript
import { Notifications } from './collections/Notifications'

export default buildConfig({
  collections: [
    // ... existing collections
    Notifications,
  ],
})
```

## Step 3: Create Hook

Create `src/payload/hooks/createNotification.ts`:

```typescript
import { getPayloadClient } from '@/lib/payload'
import { triggerEvent } from '@/lib/pusher/server'

export async function createNotification(
  recipientId: string,
  message: string,
  type: 'info' | 'success' | 'warning' | 'error',
  link?: string
) {
  const payload = await getPayloadClient()

  const notification = await payload.create({
    collection: 'notifications',
    data: {
      message,
      type,
      recipient: recipientId,
      read: false,
      link,
    },
  })

  // Trigger real-time event
  await triggerEvent(`user-${recipientId}`, 'new-notification', {
    id: notification.id,
    message: notification.message,
    type: notification.type,
  })

  return notification
}
```

## Step 4: Integrate with Existing Hooks

Update `src/payload/hooks/afterResourceChange.ts`:

```typescript
import { AfterChangeHook } from 'payload'
import { triggerEvent } from '@/lib/pusher/server'
import { createNotification } from './createNotification'

export const afterResourceChange: AfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === 'create') {
    // Broadcast to feed
    await triggerEvent('feed', 'new-resource', {
      id: doc.id,
      type: 'resource',
      title: doc.title,
      author: doc.author,
      timestamp: doc.createdAt,
      module: doc.module,
    })

    // Notify all users (except author)
    const payload = req.payload
    const users = await payload.find({
      collection: 'users',
      where: {
        id: { not_equals: doc.author },
      },
    })

    for (const user of users.docs) {
      await createNotification(
        user.id,
        `New resource: ${doc.title}`,
        'info',
        `/library/${doc.id}`
      )
    }
  }

  return doc
}
```

## Step 5: Create API Route

Create `src/app/api/notifications/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    const notifications = await payload.find({
      collection: 'notifications',
      where: {
        recipient: { equals: userId },
        ...(unreadOnly && { read: { equals: false } }),
      },
      sort: '-createdAt',
      limit: 50,
    })

    return NextResponse.json(notifications)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { notificationId, read } = await req.json()

    const payload = await getPayloadClient()

    const notification = await payload.update({
      collection: 'notifications',
      id: notificationId,
      data: { read },
    })

    return NextResponse.json(notification)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}
```

## Step 6: Create Component

Create `src/components/notifications/cs-notification-bell.ts`:

```typescript
import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { subscribeToChannel } from '@/lib/pusher/client'

interface Notification {
  id: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

@customElement('cs-notification-bell')
export class CsNotificationBell extends LitElement {
  @property({ type: String }) userId = ''
  @state() private notifications: Notification[] = []
  @state() private unreadCount = 0
  @state() private isOpen = false

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .bell {
      position: relative;
      cursor: pointer;
      padding: 0.5rem;
    }

    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      width: 300px;
      max-height: 400px;
      overflow-y: auto;
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .notification {
      padding: 1rem;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }

    .notification:hover {
      background: #f5f5f5;
    }

    .notification.unread {
      background: #eff6ff;
    }

    .notification-message {
      font-size: 0.875rem;
    }

    .notification-time {
      font-size: 0.75rem;
      color: #666;
      margin-top: 0.25rem;
    }
  `

  async connectedCallback() {
    super.connectedCallback()
    await this.fetchNotifications()
    this.subscribeToNotifications()
  }

  private async fetchNotifications() {
    const response = await fetch(
      `/api/notifications?userId=${this.userId}&unreadOnly=true`
    )
    const data = await response.json()
    this.notifications = data.docs
    this.unreadCount = data.totalDocs
  }

  private subscribeToNotifications() {
    const channel = subscribeToChannel(`user-${this.userId}`)
    channel.bind('new-notification', (data: any) => {
      this.notifications = [data, ...this.notifications]
      this.unreadCount++
    })
  }

  private toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  private async markAsRead(notification: Notification) {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notificationId: notification.id,
        read: true,
      }),
    })

    this.notifications = this.notifications.filter(
      n => n.id !== notification.id
    )
    this.unreadCount--

    if (notification.link) {
      window.location.href = notification.link
    }
  }

  render() {
    return html`
      <div class="bell" @click=${this.toggleDropdown}>
        🔔
        ${this.unreadCount > 0
          ? html`<span class="badge">${this.unreadCount}</span>`
          : ''}
      </div>
      ${this.isOpen
        ? html`
            <div class="dropdown">
              ${this.notifications.length === 0
                ? html`<div class="notification">No notifications</div>`
                : this.notifications.map(
                    notification => html`
                      <div
                        class="notification ${notification.read
                          ? ''
                          : 'unread'}"
                        @click=${() => this.markAsRead(notification)}
                      >
                        <div class="notification-message">
                          ${notification.message}
                        </div>
                        <div class="notification-time">
                          ${new Date(
                            notification.createdAt
                          ).toLocaleString()}
                        </div>
                      </div>
                    `
                  )}
            </div>
          `
        : ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-notification-bell': CsNotificationBell
  }
}
```

## Step 7: Export Component

Add to `src/components/index.ts`:

```typescript
export * from './notifications/cs-notification-bell'
```

## Step 8: Use Component

In your navigation or header:

```typescript
import '@/components/notifications/cs-notification-bell'

<cs-notification-bell userId="${currentUser.id}"></cs-notification-bell>
```

## Step 9: Generate Types

```bash
pnpm payload generate:types
```

## Step 10: Test

```bash
# Run development server
pnpm dev

# Create a resource and verify notification appears
# Check real-time updates work
```

## Result

You now have a complete notifications system with:
- Database collection for storing notifications
- Real-time updates via Pusher
- API endpoints for fetching and marking as read
- UI component with unread badge
- Integration with existing features

This pattern can be applied to add any new feature to ClassSync.
