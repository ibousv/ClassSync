import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

interface DashboardData {
  user: {
    name: string
    karma: number
  }
  stats: {
    resources: number
    homework: number
    messages: number
  }
  recentActivity: Array<{
    id: string
    title: string
    type: string
    time: string
  }>
}

@customElement('cs-dashboard')
export class CsDashboard extends LitElement {
  @property({ type: Object }) data: DashboardData = {
    user: { name: 'User', karma: 0 },
    stats: { resources: 0, homework: 0, messages: 0 },
    recentActivity: []
  }

  static styles = [
    tokens,
    css`
      :host {
        display: block;
        width: 100%;
        font-family: var(--cs-sync-font-family);
      }

      .greeting {
        font-size: var(--cs-sync-font-size-xxl);
        font-weight: var(--cs-sync-font-weight-bold);
        color: var(--cs-sync-text-primary);
        margin-bottom: var(--cs-sync-space-xl);
        line-height: var(--cs-sync-line-height-sm);
      }

      .stats-grid {
        display: grid;
        gap: var(--cs-sync-space-md);
        margin-bottom: var(--cs-sync-space-xl);
      }

      .stat-card {
        padding: var(--cs-sync-space-md);
        background: var(--cs-sync-background);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        display: flex;
        align-items: center;
        gap: var(--cs-sync-space-md);
        cursor: pointer;
        transition: all var(--cs-sync-transition-fast);
      }

      .stat-card:hover {
        box-shadow: var(--cs-sync-shadow-md);
        border-color: var(--cs-sync-primary);
      }

      .stat-icon {
        font-size: var(--cs-sync-font-size-xl);
      }

      .stat-content {
        flex: 1;
      }

      .stat-title {
        font-weight: var(--cs-sync-font-weight-semibold);
        color: var(--cs-sync-text-primary);
        font-size: var(--cs-sync-font-size-md);
        line-height: var(--cs-sync-line-height-sm);
      }

      .stat-subtitle {
        font-size: var(--cs-sync-font-size-xs);
        color: var(--cs-sync-text-tertiary);
        margin-top: var(--cs-sync-space-xs);
      }

      .section-title {
        font-size: var(--cs-sync-font-size-lg);
        font-weight: var(--cs-sync-font-weight-semibold);
        color: var(--cs-sync-text-primary);
        margin-bottom: var(--cs-sync-space-md);
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: var(--cs-sync-space-sm);
      }

      .activity-item {
        padding: var(--cs-sync-space-md);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all var(--cs-sync-transition-fast);
      }

      .activity-item:hover {
        background: var(--cs-sync-background-secondary);
        border-color: var(--cs-sync-primary);
      }

      .activity-content {
        display: flex;
        align-items: center;
        gap: var(--cs-sync-space-sm);
      }

      .activity-type {
        font-size: var(--cs-sync-font-size-xs);
        padding: var(--cs-sync-space-xs) var(--cs-sync-space-sm);
        background: var(--cs-sync-background-tertiary);
        border-radius: var(--cs-sync-radius-sm);
        color: var(--cs-sync-text-secondary);
        text-transform: uppercase;
        font-weight: var(--cs-sync-font-weight-medium);
      }

      .activity-title {
        font-weight: var(--cs-sync-font-weight-medium);
        color: var(--cs-sync-text-primary);
        font-size: var(--cs-sync-font-size-sm);
      }

      .activity-time {
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

  render() {
    return html`
      <div>
        <h1 class="greeting">Good morning, ${this.data.user.name}</h1>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-icon">📚</span>
            <div class="stat-content">
              <div class="stat-title">${this.data.stats.resources} Resources</div>
              <div class="stat-subtitle">Available in library</div>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon">✓</span>
            <div class="stat-content">
              <div class="stat-title">${this.data.stats.homework} Homework</div>
              <div class="stat-subtitle">Pending this week</div>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon">⭐</span>
            <div class="stat-content">
              <div class="stat-title">${this.data.user.karma} Karma</div>
              <div class="stat-subtitle">Keep contributing</div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="section-title">Recent activity</h2>
          ${this.data.recentActivity.length === 0
            ? html`<div class="empty-state">No recent activity</div>`
            : html`
                <div class="activity-list">
                  ${this.data.recentActivity.map(
                    item => html`
                      <div class="activity-item">
                        <div class="activity-content">
                          <span class="activity-type">${item.type}</span>
                          <span class="activity-title">${item.title}</span>
                        </div>
                        <span class="activity-time">${item.time}</span>
                      </div>
                    `
                  )}
                </div>
              `}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-dashboard': CsDashboard
  }
}
