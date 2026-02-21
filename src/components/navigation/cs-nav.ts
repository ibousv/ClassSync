import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

@customElement('cs-nav')
export class CsNav extends LitElement {
  @property({ type: Boolean }) collapsed = false

  static styles = [
    tokens,
    css`
      :host {
        display: block;
        width: 240px;
        height: 100vh;
        background: var(--cs-sync-background);
        border-right: 1px solid var(--cs-sync-border);
        font-family: var(--cs-sync-font-family);
      }

      nav {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: var(--cs-sync-space-md);
      }

      .logo {
        padding: var(--cs-sync-space-sm) 0;
        font-size: var(--cs-sync-font-size-lg);
        font-weight: var(--cs-sync-font-weight-semibold);
        color: var(--cs-sync-primary);
        margin-bottom: var(--cs-sync-space-md);
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: var(--cs-sync-space-sm);
        padding: var(--cs-sync-space-sm) var(--cs-sync-space-md);
        border-radius: var(--cs-sync-radius-md);
        cursor: pointer;
        transition: background var(--cs-sync-transition-fast);
        text-decoration: none;
        color: var(--cs-sync-text-secondary);
        font-size: var(--cs-sync-font-size-sm);
        font-weight: var(--cs-sync-font-weight-medium);
        margin-bottom: var(--cs-sync-space-xs);
      }

      .nav-item:hover {
        background: var(--cs-sync-background-secondary);
        color: var(--cs-sync-text-primary);
      }

      .nav-item.active {
        background: var(--cs-sync-background-tertiary);
        color: var(--cs-sync-primary);
      }

      .nav-icon {
        font-size: var(--cs-sync-font-size-md);
        width: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .spacer {
        flex: 1;
      }

      .user-section {
        padding-top: var(--cs-sync-space-md);
        border-top: 1px solid var(--cs-sync-border);
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: var(--cs-sync-space-sm);
        padding: var(--cs-sync-space-sm);
        border-radius: var(--cs-sync-radius-md);
        cursor: pointer;
        transition: background var(--cs-sync-transition-fast);
      }

      .user-info:hover {
        background: var(--cs-sync-background-secondary);
      }

      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: var(--cs-sync-radius-md);
        background: var(--cs-sync-primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--cs-sync-font-size-xs);
        font-weight: var(--cs-sync-font-weight-semibold);
      }

      .user-name {
        font-size: var(--cs-sync-font-size-sm);
        color: var(--cs-sync-text-primary);
        font-weight: var(--cs-sync-font-weight-medium);
      }
    `,
  ]

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
