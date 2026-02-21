import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

interface HomeworkData {
  id: string
  title: string
  module: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  completedCount: number
  totalStudents: number
}

@customElement('cs-homework-item')
export class CsHomeworkItem extends LitElement {
  @property({ type: Object }) homework!: HomeworkData

  static styles = [
    tokens,
    css`
      :host {
        display: block;
      }

      .homework {
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        padding: var(--cs-sync-space-md);
        background: var(--cs-sync-background);
        transition: box-shadow var(--cs-sync-transition-normal);
      }

      .homework:hover {
        box-shadow: var(--cs-sync-shadow-md);
      }

      .homework.high {
        border-left: 3px solid var(--cs-sync-error);
      }

      .homework.medium {
        border-left: 3px solid var(--cs-sync-warning);
      }

      .homework.low {
        border-left: 3px solid var(--cs-sync-success);
      }

      .homework-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: var(--cs-sync-space-sm);
      }

      .homework-title {
        font-weight: var(--cs-sync-font-weight-semibold);
        font-size: var(--cs-sync-font-size-md);
        color: var(--cs-sync-text-primary);
        line-height: var(--cs-sync-line-height-sm);
      }

      .homework-module {
        font-size: var(--cs-sync-font-size-xs);
        color: var(--cs-sync-text-tertiary);
        margin-top: var(--cs-sync-space-xs);
      }

      .homework-due {
        font-size: var(--cs-sync-font-size-xs);
        font-weight: var(--cs-sync-font-weight-medium);
        color: var(--cs-sync-text-secondary);
      }

      .progress-bar {
        width: 100%;
        height: 4px;
        background: var(--cs-sync-background-tertiary);
        border-radius: var(--cs-sync-radius-sm);
        overflow: hidden;
        margin: var(--cs-sync-space-sm) 0;
      }

      .progress-fill {
        height: 100%;
        background: var(--cs-sync-primary);
        transition: width var(--cs-sync-transition-normal);
      }

      .homework-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .homework-stats {
        font-size: var(--cs-sync-font-size-xs);
        color: var(--cs-sync-text-tertiary);
      }

      .checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: var(--cs-sync-primary);
      }
    `,
  ]

  private handleToggle() {
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { homeworkId: this.homework.id, completed: !this.homework.completed },
      })
    )
  }

  private getProgress() {
    return (this.homework.completedCount / this.homework.totalStudents) * 100
  }

  render() {
    return html`
      <div class="homework ${this.homework.priority}">
        <div class="homework-header">
          <div>
            <div class="homework-title">${this.homework.title}</div>
            <div class="homework-module">${this.homework.module}</div>
          </div>
          <div class="homework-due">${this.homework.dueDate}</div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this.getProgress()}%"></div>
        </div>
        <div class="homework-footer">
          <div class="homework-stats">
            ${this.homework.completedCount}/${this.homework.totalStudents} completed
          </div>
          <input
            type="checkbox"
            class="checkbox"
            .checked=${this.homework.completed}
            @change=${this.handleToggle}
          />
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-homework-item': CsHomeworkItem
  }
}
