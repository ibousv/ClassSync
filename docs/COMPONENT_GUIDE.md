# Component Development Guide

## Overview

ClassSync uses Lit for building Web Components. This guide covers creating, styling, and integrating new components.

## Component Structure

```typescript
import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('cs-component-name')
export class CsComponentName extends LitElement {
  // Public properties (attributes)
  @property({ type: String }) title = ''
  
  // Internal state
  @state() private isLoading = false
  
  // Styles
  static styles = css`
    :host {
      display: block;
    }
  `
  
  // Lifecycle
  connectedCallback() {
    super.connectedCallback()
    // Component mounted
  }
  
  disconnectedCallback() {
    super.disconnectedCallback()
    // Component unmounted
  }
  
  // Render
  render() {
    return html`
      <div>${this.title}</div>
    `
  }
}

// TypeScript declaration
declare global {
  interface HTMLElementTagNameMap {
    'cs-component-name': CsComponentName
  }
}
```

## Property Types

### String Property

```typescript
@property({ type: String }) name = ''
```

### Number Property

```typescript
@property({ type: Number }) count = 0
```

### Boolean Property

```typescript
@property({ type: Boolean }) active = false
```

### Object Property

```typescript
@property({ type: Object }) data: MyData | null = null
```

### Array Property

```typescript
@property({ type: Array }) items: Item[] = []
```

## State Management

### Internal State

```typescript
@state() private selectedId: string | null = null
```

### Computed Properties

```typescript
get filteredItems() {
  return this.items.filter(item => item.active)
}
```

## Event Handling

### Emit Custom Events

```typescript
private handleClick() {
  this.dispatchEvent(
    new CustomEvent('item-selected', {
      detail: { id: this.selectedId },
      bubbles: true,
      composed: true,
    })
  )
}
```

### Listen to Events

```typescript
render() {
  return html`
    <button @click=${this.handleClick}>Click</button>
  `
}
```

## Styling

### Component Styles

```typescript
static styles = css`
  :host {
    display: block;
    padding: 1rem;
  }
  
  :host([hidden]) {
    display: none;
  }
  
  .container {
    background: white;
    border-radius: 0.5rem;
  }
`
```

### CSS Custom Properties

```typescript
static styles = css`
  :host {
    background: var(--component-bg, white);
    color: var(--component-color, black);
  }
`
```

Usage:

```css
cs-component-name {
  --component-bg: #f5f5f5;
  --component-color: #333;
}
```

### Conditional Styles

```typescript
render() {
  return html`
    <div class=${this.active ? 'active' : 'inactive'}>
      Content
    </div>
  `
}
```

## Templates

### Conditional Rendering

```typescript
render() {
  return html`
    ${this.isLoading
      ? html`<div>Loading...</div>`
      : html`<div>Content</div>`
    }
  `
}
```

### List Rendering

```typescript
render() {
  return html`
    <ul>
      ${this.items.map(
        item => html`
          <li key=${item.id}>${item.name}</li>
        `
      )}
    </ul>
  `
}
```

### Slots

```typescript
render() {
  return html`
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  `
}
```

Usage:

```html
<cs-component-name>
  <h1 slot="header">Title</h1>
  <p>Content</p>
</cs-component-name>
```

## Data Fetching

### Fetch on Mount

```typescript
async connectedCallback() {
  super.connectedCallback()
  await this.fetchData()
}

private async fetchData() {
  this.isLoading = true
  try {
    const response = await fetch('/api/data')
    this.data = await response.json()
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    this.isLoading = false
  }
}
```

### Reactive Fetching

```typescript
@property({ type: String }) userId = ''

updated(changedProperties: Map<string, any>) {
  if (changedProperties.has('userId') && this.userId) {
    this.fetchUserData()
  }
}

private async fetchUserData() {
  const response = await fetch(`/api/users/${this.userId}`)
  this.userData = await response.json()
}
```

## Real-time Integration

### Subscribe to Pusher

```typescript
import { subscribeToChannel, unsubscribeFromChannel } from '@/lib/pusher/client'

connectedCallback() {
  super.connectedCallback()
  
  const channel = subscribeToChannel('my-channel')
  channel.bind('my-event', this.handleEvent.bind(this))
}

disconnectedCallback() {
  super.disconnectedCallback()
  unsubscribeFromChannel('my-channel')
}

private handleEvent(data: any) {
  // Update component state
  this.data = data
}
```

## Form Handling

### Input Binding

```typescript
@state() private inputValue = ''

render() {
  return html`
    <input
      type="text"
      .value=${this.inputValue}
      @input=${(e: Event) =>
        (this.inputValue = (e.target as HTMLInputElement).value)}
    />
  `
}
```

### Form Submission

```typescript
private handleSubmit(e: Event) {
  e.preventDefault()
  
  const formData = {
    name: this.name,
    email: this.email,
  }
  
  this.dispatchEvent(
    new CustomEvent('form-submit', {
      detail: formData,
    })
  )
}

render() {
  return html`
    <form @submit=${this.handleSubmit}>
      <input type="text" .value=${this.name} />
      <button type="submit">Submit</button>
    </form>
  `
}
```

## Accessibility

### ARIA Attributes

```typescript
render() {
  return html`
    <button
      aria-label="Close dialog"
      aria-pressed=${this.isPressed}
      @click=${this.handleClick}
    >
      Close
    </button>
  `
}
```

### Keyboard Navigation

```typescript
private handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    this.handleClick()
  }
}

render() {
  return html`
    <div
      role="button"
      tabindex="0"
      @keydown=${this.handleKeyDown}
      @click=${this.handleClick}
    >
      Click me
    </div>
  `
}
```

## Performance

### Lazy Rendering

```typescript
import { until } from 'lit/directives/until.js'

render() {
  return html`
    ${until(
      this.fetchData().then(data => html`<div>${data}</div>`),
      html`<div>Loading...</div>`
    )}
  `
}
```

### Memoization

```typescript
import { cache } from 'lit/directives/cache.js'

render() {
  return html`
    ${cache(this.view === 'list'
      ? html`<cs-list-view></cs-list-view>`
      : html`<cs-grid-view></cs-grid-view>`
    )}
  `
}
```

## Testing Components

### Unit Test

```typescript
import { fixture, expect } from '@open-wc/testing'
import { html } from 'lit'
import './cs-component-name'

describe('CsComponentName', () => {
  it('renders with title', async () => {
    const el = await fixture(html`
      <cs-component-name title="Test"></cs-component-name>
    `)
    
    expect(el.shadowRoot?.textContent).to.include('Test')
  })
  
  it('emits event on click', async () => {
    const el = await fixture(html`
      <cs-component-name></cs-component-name>
    `)
    
    let eventFired = false
    el.addEventListener('item-selected', () => {
      eventFired = true
    })
    
    const button = el.shadowRoot?.querySelector('button')
    button?.click()
    
    expect(eventFired).to.be.true
  })
})
```

## Component Examples

### Card Component

```typescript
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cs-card')
export class CsCard extends LitElement {
  @property({ type: String }) title = ''
  @property({ type: String }) subtitle = ''
  @property({ type: Boolean }) elevated = false

  static styles = css`
    :host {
      display: block;
    }

    .card {
      padding: 1rem;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      background: white;
    }

    .card.elevated {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #666;
      font-size: 0.875rem;
    }
  `

  render() {
    return html`
      <div class="card ${this.elevated ? 'elevated' : ''}">
        <div class="title">${this.title}</div>
        ${this.subtitle
          ? html`<div class="subtitle">${this.subtitle}</div>`
          : ''}
        <slot></slot>
      </div>
    `
  }
}
```

### List Component

```typescript
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

interface ListItem {
  id: string
  label: string
}

@customElement('cs-list')
export class CsList extends LitElement {
  @property({ type: Array }) items: ListItem[] = []

  static styles = css`
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .item {
      padding: 0.75rem;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }

    .item:hover {
      background: #f5f5f5;
    }
  `

  private handleItemClick(item: ListItem) {
    this.dispatchEvent(
      new CustomEvent('item-click', {
        detail: { item },
      })
    )
  }

  render() {
    return html`
      <ul class="list">
        ${this.items.map(
          item => html`
            <li
              class="item"
              @click=${() => this.handleItemClick(item)}
            >
              ${item.label}
            </li>
          `
        )}
      </ul>
    `
  }
}
```

## Best Practices

1. **Use TypeScript** - Full type safety
2. **Shadow DOM** - Encapsulate styles
3. **Custom Events** - Communicate with parents
4. **Reactive Properties** - Automatic re-rendering
5. **Accessibility** - ARIA attributes and keyboard support
6. **Performance** - Lazy loading and memoization
7. **Testing** - Unit tests for all components
8. **Documentation** - JSDoc comments

## Resources

- [Lit Documentation](https://lit.dev/docs/)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)
- [Open WC Testing](https://open-wc.org/docs/testing/testing-package/)
