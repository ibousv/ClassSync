import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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

  static styles = css`
    :host {
      display: block;
    }

    .homework {
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      padding: 1rem;
    }

    .homework.high {
      border-left: 4px solid #ef4444;
    }

    .homework.medium {
      border-left: 4px solid #f59e0b;
    }

    .homework.low {
      border-left: 4px solid #10b981;
    }

    .homework-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.75rem;
    }

    .homework-title {
      font-weight: 600;
      font-size: 1rem;
    }

    .homework-module {
      font-size: 0.875rem;
      color: #666;
    }

    .homework-due {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
      margin: 0.75rem 0;
    }

    .progress-fill {
      height: 100%;
      background: #10b981;
      transition: width 0.3s;
    }

    .homework-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .homework-stats {
      font-size: 0.875rem;
      color: #666;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  `

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
          <div class="homework-due">Due: ${this.homework.dueDate}</div>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width: ${this.getProgress()}%"
          ></div>
        </div>
        <div class="homework-footer">
          <div class="homework-stats">
            ${this.homework.completedCount}/${this.homework.totalStudents}
            completed
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
