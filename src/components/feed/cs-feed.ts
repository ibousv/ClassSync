import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

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

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .feed-filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .filter-btn {
      padding: 0.25rem 0.75rem;
      border: none;
      border-radius: 0.25rem;
      background: transparent;
      cursor: pointer;
      transition: background 0.15s;
      font-size: 0.8125rem;
      color: #787774;
      font-weight: 500;
    }

    .filter-btn:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    .filter-btn.active {
      background: rgba(0, 0, 0, 0.05);
      color: #37352f;
    }

    .feed-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .feed-item {
      padding: 0.75rem 1rem;
      border: 1px solid #e9e9e7;
      border-radius: 0.25rem;
      transition: background 0.15s;
      cursor: pointer;
    }

    .feed-item:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .feed-item-title {
      font-weight: 500;
      font-size: 0.9375rem;
      color: #37352f;
      margin-bottom: 0.25rem;
    }

    .feed-item-meta {
      font-size: 0.8125rem;
      color: #787774;
    }
  `

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
          ? html`
              <div style="padding: 2rem; text-align: center; color: #787774; font-size: 0.875rem;">
                No activity yet
              </div>
            `
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
