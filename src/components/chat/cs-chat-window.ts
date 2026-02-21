import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

interface Message {
  id: string
  author: string
  content: string
  timestamp: string
}

@customElement('cs-chat-window')
export class CsChatWindow extends LitElement {
  @property({ type: String }) channel = 'general'
  @property({ type: Array }) messages: Message[] = []
  @state() private messageInput = ''

  static styles = [
    tokens,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--cs-sync-background);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        font-family: var(--cs-sync-font-family);
      }

      .chat-header {
        padding: var(--cs-sync-space-md);
        border-bottom: 1px solid var(--cs-sync-border);
        font-weight: var(--cs-sync-font-weight-semibold);
        color: var(--cs-sync-text-primary);
        font-size: var(--cs-sync-font-size-md);
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--cs-sync-space-md);
        display: flex;
        flex-direction: column;
        gap: var(--cs-sync-space-md);
      }

      .message {
        display: flex;
        flex-direction: column;
        gap: var(--cs-sync-space-xs);
      }

      .message-author {
        font-weight: var(--cs-sync-font-weight-semibold);
        font-size: var(--cs-sync-font-size-sm);
        color: var(--cs-sync-text-primary);
      }

      .message-content {
        padding: var(--cs-sync-space-sm) var(--cs-sync-space-md);
        background: var(--cs-sync-background-secondary);
        border-radius: var(--cs-sync-radius-md);
        max-width: 80%;
        font-size: var(--cs-sync-font-size-sm);
        color: var(--cs-sync-text-primary);
        line-height: var(--cs-sync-line-height-md);
      }

      .message-timestamp {
        font-size: var(--cs-sync-font-size-xs);
        color: var(--cs-sync-text-tertiary);
      }

      .chat-input {
        display: flex;
        gap: var(--cs-sync-space-sm);
        padding: var(--cs-sync-space-md);
        border-top: 1px solid var(--cs-sync-border);
      }

      .input {
        flex: 1;
        padding: var(--cs-sync-space-sm) var(--cs-sync-space-md);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        font-size: var(--cs-sync-font-size-sm);
        font-family: var(--cs-sync-font-family);
        color: var(--cs-sync-text-primary);
        transition: border-color var(--cs-sync-transition-fast);
      }

      .input:focus {
        outline: none;
        border-color: var(--cs-sync-border-focus);
      }

      .send-btn {
        padding: var(--cs-sync-space-sm) var(--cs-sync-space-lg);
        background: var(--cs-sync-primary);
        color: white;
        border: none;
        border-radius: var(--cs-sync-radius-md);
        cursor: pointer;
        transition: background var(--cs-sync-transition-fast);
        font-size: var(--cs-sync-font-size-sm);
        font-weight: var(--cs-sync-font-weight-medium);
        font-family: var(--cs-sync-font-family);
      }

      .send-btn:hover {
        background: var(--cs-sync-primary-hover);
      }

      .send-btn:disabled {
        background: var(--cs-sync-background-tertiary);
        color: var(--cs-sync-text-tertiary);
        cursor: not-allowed;
      }
    `,
  ]

  private handleSend() {
    if (!this.messageInput.trim()) return

    this.dispatchEvent(
      new CustomEvent('send-message', {
        detail: { content: this.messageInput, channel: this.channel },
      })
    )
    this.messageInput = ''
  }

  private handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      this.handleSend()
    }
  }

  render() {
    return html`
      <div class="chat-header">#${this.channel}</div>
      <div class="chat-messages">
        ${this.messages.map(
          msg => html`
            <div class="message">
              <span class="message-author">${msg.author}</span>
              <div class="message-content">${msg.content}</div>
              <span class="message-timestamp">${msg.timestamp}</span>
            </div>
          `
        )}
      </div>
      <div class="chat-input">
        <input
          type="text"
          class="input"
          placeholder="Type a message..."
          .value=${this.messageInput}
          @input=${(e: Event) =>
            (this.messageInput = (e.target as HTMLInputElement).value)}
          @keypress=${this.handleKeyPress}
        />
        <button
          class="send-btn"
          @click=${this.handleSend}
          ?disabled=${!this.messageInput.trim()}
        >
          Send
        </button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-chat-window': CsChatWindow
  }
}
