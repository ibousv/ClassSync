import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .greeting {
      font-size: 2.5rem;
      font-weight: 700;
      color: #37352f;
      margin-bottom: 0.25rem;
      letter-spacing: -0.02em;
    }

    .stats-grid {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      padding: 0.75rem 1rem;
      background: #f7f6f3;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: background 0.15s;
    }

    .stat-card:hover {
      background: #eeede9;
    }

    .stat-icon {
      font-size: 1.25rem;
    }

    .stat-content {
      flex: 1;
    }

    .stat-title {
      font-weight: 500;
      color: #37352f;
      font-size: 0.9375rem;
    }

    .stat-subtitle {
      font-size: 0.8125rem;
      color: #787774;
    }

    .section {
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #37352f;
      margin-bottom: 1rem;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .activity-item {
      padding: 0.75rem 1rem;
      border: 1px solid #e9e9e7;
      border-radius: 0.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background 0.15s;
    }

    .activity-item:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .activity-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .activity-type {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      background: #e9e9e7;
      border-radius: 0.25rem;
      color: #787774;
      text-transform: uppercase;
      font-weight: 500;
    }

    .activity-title {
      font-weight: 500;
      color: #37352f;
      font-size: 0.9375rem;
    }

    .activity-time {
      font-size: 0.8125rem;
      color: #787774;
    }

    .empty-state {
      padding: 3rem 1rem;
      text-align: center;
      color: #787774;
      font-size: 0.9375rem;
    }
  `

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
              <div class="stat-title">${this.data.user.karma} Karma points</div>
              <div class="stat-subtitle">Keep contributing</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Recent activity</h2>
          ${this.data.recentActivity.length === 0
            ? html`
                <div class="empty-state">
                  No recent activity
                </div>
              `
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
