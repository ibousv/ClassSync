import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

interface FeedItem {
  id: string
  type: 'resource' | 'homework' | 'comment'
  title: string
  author: string
  timestamp: string
  module?: string
}

@customElement('cs-feed')
export class CsFeed extends LitElement {
  @property({ type: Array }) items: FeedItem[] = []
  @state() private filter = 'all'

  static styles = [
    tokens,
    css`
      :host {
        display: block;
        width: 100%;
        font-family: var(--cs-sync-font-family);
      }

      .feed-filters {
        display: flex;
        gap: var(--cs-sync-space-xs);
        margin-bottom: var(--cs-sync-space-md);
      }

      .filter-btn {
        padding: var(--cs-sync-space-xs) var(--cs-sync-space-md);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        background: var(--cs-sync-background);
        cursor: pointer;
        transition: all var(--cs-sync-transition-fast);
        font-size: var(--cs-sync-font-size-sm);
        color: var(--cs-sync-text-secondary);
        font-weight: var(--cs-sync-font-weight-medium);
        font-family: var(--cs-sync-font-family);
      }

      .filter-btn:hover {
        background: var(--cs-sync-background-secondary);
        border-color: var(--cs-sync-primary);
      }

      .filter-btn.active {
        background: var(--cs-sync-primary);
        color: white;
        border-color: var(--cs-sync-primary);
      }

      .feed-list {
        display: flex;
        flex-direction: column;
        gap: var(--cs-sync-space-sm);
      }

      .feed-item {
        padding: var(--cs-sync-space-md);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        transition: all var(--cs-sync-transition-fast);
        cursor: pointer;
      }

      .feed-item:hover {
        background: var(--cs-sync-background-secondary);
        border-color: var(--cs-sync-primary);
      }

      .feed-item-title {
        font-weight: var(--cs-sync-font-weight-semibold);
        font-size: var(--cs-sync-font-size-sm);
        color: var(--cs-sync-text-primary);
        margin-bottom: var(--cs-sync-space-xs);
        line-height: var(--cs-sync-line-height-sm);
      }

      .feed-item-meta {
        font-size: var(--cs-sync-font-size-xs);
        color: var(--cs-sync-text-tertiary);
      }

      .empty-state {
        padding: var(--cs-sync-space-xl);
        text-align: center;
        color: var(--cs-sync-text-tertiary);
        font-size: var(--cs-sync-font-size-sm);
      }
    `,
  ]

  private handleFilter(filter: string) {
    this.filter = filter
    this.dispatchEvent(
      new CustomEvent('filter-change', { detail: { filter } })
    )
  }

  render() {
    return html`
      <div class="feed-filters">
        <button
          class="filter-btn ${this.filter === 'all' ? 'active' : ''}"
          @click=${() => this.handleFilter('all')}
        >
          All
        </button>
        <button
          class="filter-btn ${this.filter === 'resource' ? 'active' : ''}"
          @click=${() => this.handleFilter('resource')}
        >
          Resources
        </button>
        <button
          class="filter-btn ${this.filter === 'homework' ? 'active' : ''}"
          @click=${() => this.handleFilter('homework')}
        >
          Homework
        </button>
      </div>
      <div class="feed-list">
        ${this.items.length === 0
          ? html`<div class="empty-state">No activity yet</div>`
          : this.items.map(
              item => html`
                <div class="feed-item">
                  <div class="feed-item-title">${item.title}</div>
                  <div class="feed-item-meta">
                    ${item.author} ${item.module ? `· ${item.module}` : ''} · ${item.timestamp}
                  </div>
                </div>
              `
            )}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-feed': CsFeed
  }
}
