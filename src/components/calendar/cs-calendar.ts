import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tokens } from '../shared/design-tokens'

interface CalendarEvent {
  id: string
  title: string
  module: string
  date: string
  type: 'course' | 'exam' | 'event'
}

@customElement('cs-calendar')
export class CsCalendar extends LitElement {
  @property({ type: Array }) events: CalendarEvent[] = []
  @state() private currentDate = new Date()
  @state() private view: 'month' | 'week' = 'month'

  static styles = [
    tokens,
    css`
      :host {
        display: block;
        width: 100%;
        font-family: var(--cs-sync-font-family);
      }

      .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--cs-sync-space-md);
        border-bottom: 1px solid var(--cs-sync-border);
      }

      .calendar-nav {
        display: flex;
        gap: var(--cs-sync-space-sm);
        align-items: center;
      }

      .nav-btn {
        padding: var(--cs-sync-space-sm) var(--cs-sync-space-md);
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        background: var(--cs-sync-background);
        cursor: pointer;
        transition: all var(--cs-sync-transition-fast);
        font-family: var(--cs-sync-font-family);
        color: var(--cs-sync-text-primary);
      }

      .nav-btn:hover {
        background: var(--cs-sync-background-secondary);
        border-color: var(--cs-sync-primary);
      }

      .calendar-title {
        font-weight: var(--cs-sync-font-weight-semibold);
        font-size: var(--cs-sync-font-size-lg);
        color: var(--cs-sync-text-primary);
      }

      .view-toggle {
        display: flex;
        gap: 0;
        border: 1px solid var(--cs-sync-border);
        border-radius: var(--cs-sync-radius-md);
        overflow: hidden;
      }

      .view-btn {
        padding: var(--cs-sync-space-sm) var(--cs-sync-space-md);
        border: none;
        background: var(--cs-sync-background);
        cursor: pointer;
        transition: all var(--cs-sync-transition-fast);
        font-size: var(--cs-sync-font-size-sm);
        font-weight: var(--cs-sync-font-weight-medium);
        color: var(--cs-sync-text-secondary);
        font-family: var(--cs-sync-font-family);
      }

      .view-btn + .view-btn {
        border-left: 1px solid var(--cs-sync-border);
      }

      .view-btn:hover {
        background: var(--cs-sync-background-secondary);
      }

      .view-btn.active {
        background: var(--cs-sync-primary);
        color: white;
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background: var(--cs-sync-border);
        border: 1px solid var(--cs-sync-border);
      }

      .calendar-day {
        background: var(--cs-sync-background);
        min-height: 100px;
        padding: var(--cs-sync-space-sm);
      }

      .day-number {
        font-weight: var(--cs-sync-font-weight-semibold);
        font-size: var(--cs-sync-font-size-sm);
        color: var(--cs-sync-text-primary);
        margin-bottom: var(--cs-sync-space-sm);
      }

      .event-item {
        font-size: var(--cs-sync-font-size-xs);
        padding: var(--cs-sync-space-xs);
        margin-bottom: var(--cs-sync-space-xs);
        border-radius: var(--cs-sync-radius-sm);
        cursor: pointer;
        transition: opacity var(--cs-sync-transition-fast);
      }

      .event-item:hover {
        opacity: 0.8;
      }

      .event-item.course {
        background: var(--cs-sync-info);
        color: white;
      }

      .event-item.exam {
        background: var(--cs-sync-error);
        color: white;
      }

      .event-item.event {
        background: var(--cs-sync-success);
        color: white;
      }
    `,
  ]

  private getMonthName() {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  private previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    )
  }

  private nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    )
  }

  render() {
    return html`
      <div class="calendar-header">
        <div class="calendar-nav">
          <button class="nav-btn" @click=${this.previousMonth}>←</button>
          <span class="calendar-title">${this.getMonthName()}</span>
          <button class="nav-btn" @click=${this.nextMonth}>→</button>
        </div>
        <div class="view-toggle">
          <button
            class="view-btn ${this.view === 'month' ? 'active' : ''}"
            @click=${() => (this.view = 'month')}
          >
            Month
          </button>
          <button
            class="view-btn ${this.view === 'week' ? 'active' : ''}"
            @click=${() => (this.view = 'week')}
          >
            Week
          </button>
        </div>
      </div>
      <div class="calendar-grid">
        ${Array.from({ length: 35 }, (_, i) => html`
          <div class="calendar-day">
            <div class="day-number">${i + 1}</div>
          </div>
        `)}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-calendar': CsCalendar
  }
}
