import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

interface FileData {
  id: string
  title: string
  author: string
  type: string
  size: string
  views: number
  reactions: number
}

@customElement('cs-file-card')
export class CsFileCard extends LitElement {
  @property({ type: Object }) file!: FileData

  static styles = [
    tokens,
    css`
      :host {
        display: block;
      }

      .card {
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        padding: var(--cs-sync-space-md);
        background: var(--cs-sync-background);
        transition: all var(--cs-sync-transition-normal);
      }

      .card:hover {
        box-shadow: var(--cs-sync-shadow-lg);
        border-color: var(--cs-sync-primary);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: var(--cs-sync-space-sm);
      }

      .card-title {
        font-weight: var(--cs-sync-font-weight-semibold);
        font-size: var(--cs-sync-font-size-md);
        color: var(--cs-sync-text-primary);
        line-height: var(--cs-sync-line-height-sm);
      }

      .card-type {
        font-size: var(--cs-sync-font-size-xs);
        padding: var(--cs-sync-space-xs) var(--cs-sync-space-sm);
        background: var(--cs-sync-background-tertiary);
        border-radius: var(--cs-sync-radius-sm);
        color: var(--cs-sync-text-secondary);
        font-weight: var(--cs-sync-font-weight-medium);
      }

      .card-meta {
        display: flex;
        gap: var(--cs-sync-space-md);
        font-size: var(--cs-sync-font-size-xs);
        color: var(--cs-sync-text-tertiary);
        margin-bottom: var(--cs-sync-space-md);
      }

      .card-actions {
        display: flex;
        gap: var(--cs-sync-space-sm);
      }

      .btn {
        padding: var(--cs-sync-space-sm) var(--cs-sync-space-md);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        background: var(--cs-sync-background);
        cursor: pointer;
        transition: all var(--cs-sync-transition-fast);
        font-size: var(--cs-sync-font-size-sm);
        font-weight: var(--cs-sync-font-weight-medium);
        color: var(--cs-sync-text-primary);
        font-family: var(--cs-sync-font-family);
      }

      .btn:hover {
        background: var(--cs-sync-background-secondary);
      }

      .btn-primary {
        background: var(--cs-sync-primary);
        color: white;
        border-color: var(--cs-sync-primary);
      }

      .btn-primary:hover {
        background: var(--cs-sync-primary-hover);
        border-color: var(--cs-sync-primary-hover);
      }
    `,
  ]

  private handleDownload() {
    this.dispatchEvent(
      new CustomEvent('download', { detail: { fileId: this.file.id } })
    )
  }

  private handleReact() {
    this.dispatchEvent(
      new CustomEvent('react', { detail: { fileId: this.file.id } })
    )
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <span class="card-title">${this.file.title}</span>
          <span class="card-type">${this.file.type}</span>
        </div>
        <div class="card-meta">
          <span>${this.file.author}</span>
          <span>${this.file.size}</span>
          <span>${this.file.views} views</span>
          <span>${this.file.reactions} reactions</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-primary" @click=${this.handleDownload}>
            Download
          </button>
          <button class="btn" @click=${this.handleReact}>React</button>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-file-card': CsFileCard
  }
}
