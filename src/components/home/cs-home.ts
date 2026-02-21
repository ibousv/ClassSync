import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

@customElement('cs-home')
export class CsHome extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
        width: 100%;
        font-family: var(--cs-sync-font-family);
      }

      .hero {
        text-align: center;
        padding: var(--cs-sync-space-xl) var(--cs-sync-space-md);
        max-width: 800px;
        margin: 0 auto;
      }

      .logo {
        font-size: 3rem;
        margin-bottom: var(--cs-sync-space-md);
      }

      .title {
        font-size: var(--cs-sync-font-size-xxl);
        font-weight: var(--cs-sync-font-weight-bold);
        color: var(--cs-sync-text-primary);
        margin-bottom: var(--cs-sync-space-md);
        line-height: var(--cs-sync-line-height-sm);
      }

      .subtitle {
        font-size: var(--cs-sync-font-size-lg);
        color: var(--cs-sync-text-secondary);
        margin-bottom: var(--cs-sync-space-xl);
        line-height: var(--cs-sync-line-height-lg);
      }

      .cta-buttons {
        display: flex;
        gap: var(--cs-sync-space-md);
        justify-content: center;
        margin-bottom: var(--cs-sync-space-xl);
      }

      .btn {
        padding: var(--cs-sync-space-md) var(--cs-sync-space-xl);
        border-radius: var(--cs-sync-radius-md);
        font-size: var(--cs-sync-font-size-md);
        font-weight: var(--cs-sync-font-weight-semibold);
        cursor: pointer;
        transition: all var(--cs-sync-transition-fast);
        text-decoration: none;
        border: none;
        font-family: var(--cs-sync-font-family);
      }

      .btn-primary {
        background: var(--cs-sync-primary);
        color: white;
      }

      .btn-primary:hover {
        background: var(--cs-sync-primary-hover);
      }

      .btn-secondary {
        background: var(--cs-sync-background-secondary);
        color: var(--cs-sync-text-primary);
        border: 1px solid var(--cs-sync-border);
      }

      .btn-secondary:hover {
        background: var(--cs-sync-background-tertiary);
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--cs-sync-space-xl);
        padding: var(--cs-sync-space-xl) var(--cs-sync-space-md);
        max-width: 1000px;
        margin: 0 auto;
      }

      .feature {
        text-align: center;
        padding: var(--cs-sync-space-md);
      }

      .feature-icon {
        font-size: 2.5rem;
        margin-bottom: var(--cs-sync-space-md);
      }

      .feature-title {
        font-size: var(--cs-sync-font-size-lg);
        font-weight: var(--cs-sync-font-weight-semibold);
        color: var(--cs-sync-text-primary);
        margin-bottom: var(--cs-sync-space-sm);
      }

      .feature-desc {
        font-size: var(--cs-sync-font-size-sm);
        color: var(--cs-sync-text-secondary);
        line-height: var(--cs-sync-line-height-md);
      }

      .footer {
        text-align: center;
        padding: var(--cs-sync-space-xl);
        color: var(--cs-sync-text-tertiary);
        font-size: var(--cs-sync-font-size-sm);
        border-top: 1px solid var(--cs-sync-border);
        margin-top: var(--cs-sync-space-xl);
      }
    `,
  ]

  private handleGetStarted() {
    this.dispatchEvent(
      new CustomEvent('get-started', {
        bubbles: true,
        composed: true
      })
    )
  }

  private handleLogin() {
    this.dispatchEvent(
      new CustomEvent('login', {
        bubbles: true,
        composed: true
      })
    )
  }

  render() {
    return html`
      <div>
        <div class="hero">
          <div class="logo">📚</div>
          <h1 class="title">ClassSync</h1>
          <p class="subtitle">
            Collaborative platform for academic management and student mutual assistance.
            Share resources, track homework, and help each other succeed.
          </p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click=${this.handleGetStarted}>
              Get started
            </button>
            <button class="btn btn-secondary" @click=${this.handleLogin}>
              Sign in
            </button>
          </div>
        </div>

        <div class="features">
          <div class="feature">
            <div class="feature-icon">📚</div>
            <h3 class="feature-title">Resource Library</h3>
            <p class="feature-desc">
              Share and access course materials organized by module
            </p>
          </div>

          <div class="feature">
            <div class="feature-icon">✓</div>
            <h3 class="feature-title">Homework Tracking</h3>
            <p class="feature-desc">
              Keep track of assignments with deadlines and completion status
            </p>
          </div>

          <div class="feature">
            <div class="feature-icon">💬</div>
            <h3 class="feature-title">Real-time Chat</h3>
            <p class="feature-desc">
              Instant messaging for quick questions and collaboration
            </p>
          </div>

          <div class="feature">
            <div class="feature-icon">📅</div>
            <h3 class="feature-title">Calendar</h3>
            <p class="feature-desc">
              View all your courses, exams, and events in one place
            </p>
          </div>

          <div class="feature">
            <div class="feature-icon">⭐</div>
            <h3 class="feature-title">Karma System</h3>
            <p class="feature-desc">
              Earn points and badges for helping your classmates
            </p>
          </div>

          <div class="feature">
            <div class="feature-icon">🔔</div>
            <h3 class="feature-title">Activity Feed</h3>
            <p class="feature-desc">
              Stay updated with real-time class activities
            </p>
          </div>
        </div>

        <div class="footer">
          <p>Open source • Built for students, by students</p>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-home': CsHome
  }
}
