import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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

  static styles = css`
    :host {
      display: block;
    }

    .card {
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      padding: 1rem;
      transition: all 0.2s;
    }

    .card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.75rem;
    }

    .card-title {
      font-weight: 600;
      font-size: 1rem;
    }

    .card-type {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      background: #f5f5f5;
      border-radius: 0.25rem;
    }

    .card-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.75rem;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875rem;
    }

    .btn:hover {
      background: #f5f5f5;
    }

    .btn-primary {
      background: #1a1a1a;
      color: white;
      border-color: #1a1a1a;
    }

    .btn-primary:hover {
      background: #333;
    }
  `

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
          <span>By ${this.file.author}</span>
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
