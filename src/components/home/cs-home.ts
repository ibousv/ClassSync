import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('cs-home')
export class CsHome extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .logo {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 3rem;
      font-weight: 700;
      color: #37352f;
      margin-bottom: 1rem;
      letter-spacing: -0.03em;
    }

    .subtitle {
      font-size: 1.25rem;
      color: #787774;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 4rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.25rem;
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      text-decoration: none;
      border: none;
    }

    .btn-primary {
      background: #37352f;
      color: white;
    }

    .btn-primary:hover {
      background: #2d2b28;
    }

    .btn-secondary {
      background: #f7f6f3;
      color: #37352f;
    }

    .btn-secondary:hover {
      background: #eeede9;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .feature {
      text-align: center;
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #37352f;
      margin-bottom: 0.5rem;
    }

    .feature-desc {
      font-size: 0.9375rem;
      color: #787774;
      line-height: 1.5;
    }

    .footer {
      text-align: center;
      padding: 2rem;
      color: #787774;
      font-size: 0.875rem;
      border-top: 1px solid #e9e9e7;
      margin-top: 4rem;
    }
  `

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
