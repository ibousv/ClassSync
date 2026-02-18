import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

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

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
    }

    .chat-header {
      padding: 1rem;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 600;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .message-author {
      font-weight: 600;
      font-size: 0.875rem;
    }

    .message-content {
      padding: 0.5rem 0.75rem;
      background: #f5f5f5;
      border-radius: 0.5rem;
      max-width: 80%;
    }

    .message-timestamp {
      font-size: 0.75rem;
      color: #666;
    }

    .chat-input {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid #e5e5e5;
    }

    .input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }

    .input:focus {
      outline: none;
      border-color: #1a1a1a;
    }

    .send-btn {
      padding: 0.75rem 1.5rem;
      background: #1a1a1a;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .send-btn:hover {
      background: #333;
    }

    .send-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `

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
