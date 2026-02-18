import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cs-nav')
export class CsNav extends LitElement {
  @property({ type: Boolean }) collapsed = false

  static styles = css`
    :host {
      display: block;
      width: 240px;
      height: 100vh;
      background: #fbfbfa;
      border-right: 1px solid #e9e9e7;
      transition: width 0.2s ease;
    }

    nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0.5rem;
    }

    .logo {
      padding: 0.75rem 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: #37352f;
      margin-bottom: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
      color: #37352f;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .nav-item:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    .nav-item.active {
      background: rgba(0, 0, 0, 0.05);
    }

    .nav-icon {
      font-size: 1.125rem;
      width: 1.25rem;
      height: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .divider {
      height: 1px;
      background: #e9e9e7;
      margin: 0.5rem 0;
    }

    .spacer {
      flex: 1;
    }

    .user-section {
      padding: 0.5rem;
      border-top: 1px solid #e9e9e7;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background 0.15s;
    }

    .user-info:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    .avatar {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.25rem;
      background: #e9e9e7;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
    }

    .user-name {
      font-size: 0.875rem;
      color: #37352f;
      font-weight: 500;
    }
  `

  render() {
    return html`
      <nav>
        <div class="logo">ClassSync</div>
        
        <a href="/" class="nav-item active">
          <span class="nav-icon">🏠</span>
          <span>Home</span>
        </a>
        <a href="/library" class="nav-item">
          <span class="nav-icon">📚</span>
          <span>Library</span>
        </a>
        <a href="/homework" class="nav-item">
          <span class="nav-icon">✓</span>
          <span>Homework</span>
        </a>
        <a href="/calendar" class="nav-item">
          <span class="nav-icon">📅</span>
          <span>Calendar</span>
        </a>
        <a href="/chat" class="nav-item">
          <span class="nav-icon">💬</span>
          <span>Chat</span>
        </a>

        <div class="spacer"></div>

        <div class="user-section">
          <div class="user-info">
            <div class="avatar">U</div>
            <span class="user-name">User</span>
          </div>
        </div>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-nav': CsNav
  }
}
